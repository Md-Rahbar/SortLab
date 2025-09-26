export default function selectionSortAnimations(arr) {
  const animations = [];
  const n = arr.length;
  const temp = [...arr];

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([minIdx, j, "compare"]);
      if (temp[j] < temp[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, "swap"]);
      [temp[i], temp[minIdx]] = [temp[minIdx], temp[i]];
    }
    animations.push([i, null, "done"]);
  }
  return animations;
}
