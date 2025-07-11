function calculateGreenScore(products) {
  let score = 0;
  products.forEach((p) => {
    if (p.tags.isVegan) score += 5;
    if (p.tags.isCrueltyFree) score += 5;
    if (p.tags.packagingType === "compostable") score += 5;
    else if (p.tags.packagingType === "recyclable") score += 3;
    if (p.tags.localScore >= 70) score += 2;
  });

  const maxScore = products.length * 20; // max points possible per product
  const normalizedScore = Math.min((score / maxScore) * 100, 100);
  return Math.round(normalizedScore);
}

module.exports = calculateGreenScore;
