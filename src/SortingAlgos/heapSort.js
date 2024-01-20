const heapify = (arr, n, i, animation) => {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  animation.push(['root', i]);
  if (left < n && arr[left] > arr[largest]) {
    animation.push(['left', left]);
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    animation.push(['right', right]);
    largest = right;
  }
  if (largest !== i) {
    animation.push(['swap', i, largest]);
    animation.push(['compare', i, largest]);
    if (largest !== left && left < n) animation.push(['remove', left]);
    if (largest !== right && right < n) animation.push(['remove', right]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animation);
  }
  animation.push(['root', 'remove', i]);
}

const heapSort = (arr) => {
  const n = arr.length;
  const animation = [];
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animation);
  }

  for (let i = n - 1; i >= 0; i--) {
    animation.push(['maxify', i, 0]);
    animation.push(['swap', i, 0]);
    animation.push(['compare', i, 0]);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animation);
  }
  return animation;
}

export {
  heapSort
}
