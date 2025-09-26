export default function insertionSortAnimations(arr) {
  const animations = [];
  const temp = [...arr];
  const n = temp.length;

  for (let i = 1; i < n; i++) {
    let key = temp[i];
    let j = i - 1;

    while (j >= 0 && temp[j] > key) {
      animations.push([j, j + 1, "compare"]);
      animations.push([j + 1, j, "swap"]);
      temp[j + 1] = temp[j];
      j--;
    }
    temp[j + 1] = key;
    animations.push([j + 1, null, "done"]);
  }
  return animations;
}
