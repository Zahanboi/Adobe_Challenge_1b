let embedder;

async function loadEmbedder() {
  if (!embedder) {
    const { pipeline } = await import('@xenova/transformers');
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
}

async function getEmbedding(text) {
  if (!embedder) {
    throw new Error('Embedder not loaded. Call loadEmbedder() first.');
  }
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return output.data;
}

module.exports = {
  loadEmbedder,
  getEmbedding,
};
