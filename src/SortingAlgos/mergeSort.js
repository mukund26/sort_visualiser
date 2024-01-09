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

export {
  mergeSort
}
