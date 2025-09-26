export default function heapSortAnimations(arr) {
  const animations = [];
  const temp = [...arr];
  const n = temp.length;

  function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
      animations.push([i, left, "compare"]);
      if (temp[left] > temp[largest]) largest = left;
    }
    if (right < n) {
      animations.push([i, right, "compare"]);
      if (temp[right] > temp[largest]) largest = right;
    }

    if (largest !== i) {
      animations.push([i, largest, "swap"]);
      [temp[i], temp[largest]] = [temp[largest], temp[i]];
      heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i, "swap"]);
    [temp[0], temp[i]] = [temp[i], temp[0]];
    heapify(i, 0);
    animations.push([i, null, "done"]);
  }
  animations.push([0, null, "done"]);

  return animations;
}
