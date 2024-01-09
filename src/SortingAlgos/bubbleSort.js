const bubbleSortWithAnimation = (arr) => {
  let swapped, animation = [];
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    swapped = false;
    for (let j = 0; j < length - i - 1; j++) {
      animation.push([j, j + 1, 'compare']);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
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
  return animation
}

export {
  bubbleSortWithAnimation
}