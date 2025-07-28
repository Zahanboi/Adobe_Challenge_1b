async function parsePDF(filePath, fs, pdfParse) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  // console.log(data);
  
  const pages = data.text.split('\n\n');
  return pages.map((text, index) => ({
    page: index + 1,
    text: text.trim()
  }));
}

module.exports = { parsePDF };