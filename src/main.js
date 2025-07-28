const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { parsePDF } = require('./parser.js');
const { loadEmbedder, getEmbedding } = require('./embedder.js');
const { rankSections } = require('./ranker.js');
const { writeOutput } = require('./generateOutput.js');

const getCollectionFolders = (basePath) =>
  fs.readdirSync(basePath).filter(name =>
    name.startsWith('Collection-') &&
    fs.statSync(path.join(basePath, name)).isDirectory()
  );

(async () => {
  console.time("processing");
  await loadEmbedder();

  const basePath = './data/input';
  const collectionFolders = getCollectionFolders(basePath);

  for (const collection of collectionFolders) {
    const collectionPath = path.join(basePath, collection);
    const inputPath = path.join(collectionPath, 'challenge1b_input.json');

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️ Skipping ${collection}: Missing input JSON`);
      continue;
    }

    const inputJson = JSON.parse(fs.readFileSync(inputPath));
    const persona = inputJson.persona;
    const job = inputJson.job_to_be_done;
    const docs = inputJson.documents;

    const query = `${persona.role} needs to: ${job}`;
    const queryEmbedding = await getEmbedding(query);

    let allSections = [];

    for (const doc of docs) {
      const filePath = path.join(collectionPath, 'PDFs', doc.filename);

      try {
        const pages = await parsePDF(filePath, fs, pdfParse);

        console.log(doc.filename);
        for (const page of pages) {
          const embedding = await getEmbedding(page.text.slice(0, 500));
          
          allSections.push({
            docName: doc.filename,
            page: page.page,
            text: page.text,
            title: page.text.split('\n')[0].slice(0, 80),
            embedding
          });
        }

        // console.log(`✅ Parsed ${collection}/${doc.filename}`);
      } catch (err) {
        console.error(`❌ Failed to parse ${collection}/${doc.filename}: ${err.message}`);
      }
    }

    const topSections = rankSections(allSections, queryEmbedding);
    writeOutput({
      docs,
      persona,
      job,
      sections: topSections,
      collection
    });
  }
  console.timeEnd("processing");
})();
