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
  heapSort
}
