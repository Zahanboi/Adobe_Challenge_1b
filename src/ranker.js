function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (magA * magB);
}

function rankSections(sections, queryEmbedding) {
  return sections.map(sec => ({
    ...sec,
    similarity: cosineSimilarity(sec.embedding, queryEmbedding)
  })).sort((a, b) => b.similarity - a.similarity).slice(0, 5);
}

module.exports = {
  cosineSimilarity,
  rankSections
};