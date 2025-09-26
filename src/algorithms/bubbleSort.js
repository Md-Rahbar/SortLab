export default function bubbleSortAnimations(arr) {
  const animations = [];
  const n = arr.length;
  const temp = [...arr];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1, "compare"]);
      if (temp[j] > temp[j + 1]) {
        animations.push([j, j + 1, "swap"]);
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
      }
    }
    animations.push([n - i - 1, null, "done"]);
  }
  return animations;
}
