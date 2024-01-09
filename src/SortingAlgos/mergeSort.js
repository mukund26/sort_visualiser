// improve animation to show swaps 
 
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

const mergeSortWithAnimation = (arr) => {
  if (arr.length === 1) return arr;
  const animation = [];
  const auxiliaryArray = arr.slice();
  mergeSortHelper(arr, 0, arr.length - 1, auxiliaryArray, animation);
  return animation;
}

const mergeSortHelper = (arr, startIdx, endIdx, auxiliaryArray, animation) => {
  if (startIdx === endIdx) return;
  const mid = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, mid, arr, animation);
  mergeSortHelper(auxiliaryArray, mid + 1, endIdx, arr, animation);
  merge(arr, startIdx, mid, endIdx, auxiliaryArray, animation);
}

const merge = (array, startIdx, mid, endIdx, auxiliaryArray, animation) => {
  let i = startIdx, j = mid + 1, k = startIdx;
  while(i <= mid && j <= endIdx) {
    animation.push([i, j, 'compare']); // show the comparison indices
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animation.push([k, k, auxiliaryArray[i]]);
      animation.push([i, j, 'compare']); // show the comparison indices
      array[k++] = auxiliaryArray[i++];
    } else {
      animation.push([k, k, auxiliaryArray[j]]);
      animation.push([i, j, 'compare']); // show the comparison indices
      array[k++] = auxiliaryArray[j++];
    }
  }
  while(i <= mid) {
    animation.push([i, i, 'compare']); // show the comparison indices
    animation.push([k, k, auxiliaryArray[i]]);
    animation.push([i, i, 'compare']); // show the comparison indices
    array[k++] = auxiliaryArray[i++];
  }
  while(j <= endIdx) {
    animation.push([j, j, 'compare']); // show the comparison indices
    animation.push([k, k, auxiliaryArray[j]]);
    animation.push([j, j, 'compare']); // show the comparison indices
    array[k++] = auxiliaryArray[j++];
  }
}

export {
  mergeSort,
  mergeSortWithAnimation
}
