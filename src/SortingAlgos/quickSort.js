const partition = (arr, low, high) => {
  const pivot = arr[high];
  let partitionIdx = low;
  for (let i = low; i < high; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[partitionIdx]] = [arr[partitionIdx], arr[i]];
      partitionIdx++;
    }
  }
  [arr[partitionIdx], arr[high]] = [arr[high], arr[partitionIdx]];
  return partitionIdx;
}

const quickSortHelper = (arr, low, high) => {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSortHelper(arr, low, pivot - 1);
    quickSortHelper(arr, pivot + 1, high);
  }
}

const quickSort = (arr) => {
  const length = arr.length;
  if (length <= 1) return arr;
  quickSortHelper(arr, 0, length - 1);
  return arr;
}

export {
  quickSort
}
