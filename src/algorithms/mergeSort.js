export default function mergeSortAnimations(arr) {
  const animations = [];
  const temp = [...arr];

  function merge(start, mid, end) {
    let left = temp.slice(start, mid + 1);
    let right = temp.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      animations.push([start + i, mid + 1 + j, "compare"]);
      if (left[i] <= right[j]) {
        animations.push([k, start + i, "swap"]);
        temp[k] = left[i];
        i++;
      } else {
        animations.push([k, mid + 1 + j, "swap"]);
        temp[k] = right[j];
        j++;
      }
      k++;
    }
    
    while (i < left.length) {
      animations.push([k, start + i, "swap"]);
      temp[k] = left[i];
      i++;
      k++;
    }
    
    while (j < right.length) {
      animations.push([k, mid + 1 + j, "swap"]);
      temp[k] = right[j];
      j++;
      k++;
    }
  }

  function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    merge(start, mid, end);
  }

  mergeSort(0, temp.length - 1);

  for (let i = 0; i < temp.length; i++) {
    animations.push([i, null, "done"]);
  }

  return animations;
}
