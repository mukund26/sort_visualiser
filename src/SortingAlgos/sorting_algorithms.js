const mergeSort = (arr) => {
  if (arr.length === 1) return arr;
  const middleIdx = Math.floor(arr.length / 2);
  const firstHalf = mergeSort(arr.slice(0, middleIdx));
  const secondHalf = mergeSort(arr.slice(middleIdx));
  const sortedArray = [];
  let i = 0, j = 0, k = 0;
  while (i < firstHalf.length && j < secondHalf.length) {
    if (firstHalf[i] < secondHalf[j]) {
      sortedArray[k++] = firstHalf[i++];
    } else {
      sortedArray[k++] = secondHalf[j++];
    }
  }
  while (i < firstHalf.length) {
    sortedArray[k++] = firstHalf[i++];
  }
  while (j < secondHalf.length) {
    sortedArray[k++] = secondHalf[j++];
  }
  return sortedArray;
}

const bubbleSort = (arr) => {
  let auxiliaryArray = arr.slice();
  let swapped;
  let animation = [];
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    swapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      animation.push([j, j + 1, 'compare']);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        [auxiliaryArray[j], auxiliaryArray[j + 1]] = [auxiliaryArray[j + 1], auxiliaryArray[j]];
        swapped = true;
        animation.push([j, j + 1, 'swap']);
        animation.push([j, j + 1, 'compare']);
      } else {
        animation.push([j, j + 1, 'not_swap']);
        animation.push([j, j + 1, 'compare']);
      }
    }
    if (!swapped) break;
  }
  return animation;
}

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

const heapify = (arr, length, i) => {
  let largest = i;
  const left = i * 2 + 1;
  const right = i * 2 + 2;
  if (left < length && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < length && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(arr, length, largest);
  }
}

const heapSort = (arr) => {
  const length = arr.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(arr, length, i);
  }
  for (let i = length - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

export {
  mergeSort,
  bubbleSort,
  quickSort,
  heapSort
}
