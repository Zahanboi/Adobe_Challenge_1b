const fs = require('fs');
const path = require('path');

function writeOutput({ docs, persona, job, sections, collection }) {
  const output = {
    metadata: {
      input_documents: docs.map(doc => doc.filename),
      persona: persona.role,
      job_to_be_done: job.task,
      processing_timestamp: new Date().toISOString()
    },
    extracted_sections: sections.map((s, i) => ({
      document: s.docName,
      section_title: s.title || 'N/A',
      importance_rank: i + 1,
      page_number: s.page
    })),
    subsection_analysis: sections.map(s => ({
      document: s.docName,
      refined_text: s.text.slice(0, 1000),
      page_number: s.page
    }))
  };

  const outputDir = path.join('data', 'output', collection);
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `challenge1b_output.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`✅ Output written to: ${outputPath}`);
}

module.exports = { writeOutput };
