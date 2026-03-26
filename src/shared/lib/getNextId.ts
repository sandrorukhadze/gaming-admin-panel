export function getNextId(items: { id: number }[]): number {
  if (items.length === 0) {
    return 1;
  }

  const maxId = Math.max(...items.map((item) => item.id));

  return maxId + 1;
}