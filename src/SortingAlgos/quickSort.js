const partition = (arr, low, high, animation) => {
  const pivot = arr[high];
  let partitionIdx = low;
  for (let i = low; i < high; i++) {
    animation.push(['pivot', high]);
    if (arr[i] < pivot) {
      animation.push(['swap', i, partitionIdx ]);
      animation.push(['compare', i, partitionIdx ]);
      [arr[i], arr[partitionIdx]] = [arr[partitionIdx], arr[i]];
      partitionIdx++;
    } else {
      animation.push(['not_swap', i, i])
      animation.push(['compare', i, i])
    }
  }
  animation.push(['pivot', high]);
  animation.push(['swap', high, partitionIdx]);
  animation.push(['compare', high, partitionIdx]);
  [arr[partitionIdx], arr[high]] = [arr[high], arr[partitionIdx]];
  return partitionIdx;
}

const quickSortHelper = (arr, low, high, animation) => {
  if (low < high) {
    const pivot = partition(arr, low, high, animation);
    quickSortHelper(arr, low, pivot - 1, animation);
    quickSortHelper(arr, pivot + 1, high, animation);
  }
}

const quickSort = (arr) => {
  const length = arr.length;
  if (length <= 1) return arr;
  const animation = [];
  quickSortHelper(arr, 0, length - 1, animation);
  return animation;
}

export {
  quickSort
}
