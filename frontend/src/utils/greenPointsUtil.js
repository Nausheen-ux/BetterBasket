/**
 * Calculates total green points for the cart by comparing each item
 * with the products.json database and summing points based on green_score.
 */
export async function calculateGreenPoints(cartItems) {
  try {
    const res = await fetch("/data/products.json");
    const products = await res.json();

    let totalPoints = 0;

    for (let item of cartItems) {
      const match = products.find(
        (p) => p.name.trim().toLowerCase() === item.name.trim().toLowerCase()
      );

      if (match) {
        const score = match.green_score || 0;
        totalPoints += Math.round((score / 10) * item.quantity);
      }
    }

    return totalPoints;
  } catch (error) {
    console.error("❌ Error calculating green points:", error);
    return 0;
  }
}
