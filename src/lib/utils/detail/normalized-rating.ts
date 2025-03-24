export default function normalizedRating(rating: number) {
  return Math.max(0, Math.min(10, rating)) / 2;
}
