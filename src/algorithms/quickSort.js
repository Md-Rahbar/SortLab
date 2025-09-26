export default function quickSortAnimations(arr) {
  const animations = [];
  const temp = [...arr];

  function partition(low, high) {
    let pivot = temp[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push([j, high, "compare"]);
      if (temp[j] < pivot) {
        i++;
        if (i !== j) {
          animations.push([i, j, "swap"]);
          [temp[i], temp[j]] = [temp[j], temp[i]];
        }
      }
    }
    if (i + 1 !== high) {
      animations.push([i + 1, high, "swap"]);
      [temp[i + 1], temp[high]] = [temp[high], temp[i + 1]];
    }
    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, temp.length - 1);

  for (let i = 0; i < temp.length; i++) {
    animations.push([i, null, "done"]);
  }

  return animations;
}
