import React from 'react';
import './SortVisualiser.css';
import { bubbleSortWithAnimation } from '../SortingAlgos/bubbleSort.js';
import { mergeSortWithAnimation } from '../SortingAlgos/mergeSort.js';
import { quickSort } from '../SortingAlgos/quickSort.js';
import { heapSort } from '../SortingAlgos/heapSort.js';

// Show all soring algorithms at once in separate grids and then their graphs and visualisations
// print the time complexity and space complexity of each algorithm in the grid
// print the value of time taken to sort the array in the grid for each algorithm 
// print the value of time with animation and without it 
// maybe use redux if looks more neat and  easy
// stop sorting if refresh clicked and disable other buttons
// animate all sortings, base sorting and animated sorts

const NUMBER_OF_ARRAY_BARS = 290;

const BASE_COLOR = 'turquoise';

const ANIMATION_TIME_IN_MS = 10;

class SortVisualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      auxArr: [],
      arraySize: 0,
      mergeSortTime: 0,
      bubbleSortTime: 0,
      quickSortTime: 0,
      heapSortTime: 0
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray(normalisedValue) {
    const array = [];
    this.setState({ array });
    const actualSize = normalisedValue ? normalisedValue : this.state.arraySize || NUMBER_OF_ARRAY_BARS;
    for (let i = 0; i < actualSize; i++) {
      array.push(this.randomIntFromInterval(250, 750));
    }
    this.setState({ array, mergeSortTime: 0, bubbleSortTime: 0, quickSortTime: 0, heapSortTime: 0, arraySize: actualSize });
    this.setState({ auxArr: array.slice() })
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  testSortingAlgo() {
    const numberOfTests = this.randomIntFromInterval(5, 1000);
    for (let i = 0; i < numberOfTests; i++) {
      const arr = [];
      const length = this.randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        arr.push(this.randomIntFromInterval(-1000, 1000));
      }
      const jsSortedArr = arr.slice().sort((a, b) => a - b);
      const animation = bubbleSortWithAnimation(arr);
      console.log(this.verifySortingAlgo(jsSortedArr, arr));
    }
  }

  verifySortingAlgo(jsSortedArr, manualSortedArr) {
    if (jsSortedArr.length !== manualSortedArr.length) return false;
    for (let i = 0; i < jsSortedArr.length; i++) {
      if (jsSortedArr[i] !== manualSortedArr[i]) return false;
    }
    return true;
  }

  mergeSort() {
    const startTime = performance.now();
    const animation = mergeSortWithAnimation(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, funcVal] = animation[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (funcVal === 'compare') {
        if (i > 1 && animation[i - 1][2] !== 'compare') {
          setTimeout(() => {
            barOneStyle.backgroundColor = BASE_COLOR;
            barTwoStyle.backgroundColor = BASE_COLOR;
          }, i * ANIMATION_TIME_IN_MS);
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = 'red';
            barTwoStyle.backgroundColor = 'red';
          }, i * ANIMATION_TIME_IN_MS);
        }
      } else {
        setTimeout(() => {
          barOneStyle.height = `${funcVal}px`;
        }, i * ANIMATION_TIME_IN_MS);
      }
    }
    this.setState({ mergeSortTime: timeTaken });
  }

  heightSwap(a, b) {
    const temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
  }

  bubbleSort() {
    const startTime = performance.now();
    const animation = bubbleSortWithAnimation(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, funcVal] = animation[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (funcVal === 'compare') {
        if (i > 1 && animation[i - 1][2] !== 'compare') {
          setTimeout(() => {
            barOneStyle.backgroundColor = BASE_COLOR;
            barTwoStyle.backgroundColor = BASE_COLOR;
          }, i * ANIMATION_TIME_IN_MS);
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = 'red';
            barTwoStyle.backgroundColor = 'red';
          }, i * ANIMATION_TIME_IN_MS);
        }
      } else if (funcVal === 'swap') {
        setTimeout(() => {
          this.heightSwap(arrayBars[barOneIdx], arrayBars[barTwoIdx]);
        }, i * ANIMATION_TIME_IN_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'red';
          barTwoStyle.backgroundColor = 'red';
        }, i * ANIMATION_TIME_IN_MS);
      }
    }
    this.setState({ bubbleSortTime: timeTaken });
  }

  quickSort() {
    const startTime = performance.now();
    const sortedArray = quickSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    this.setState({ quickSortTime: timeTaken });
  }

  heapSort() {
    const startTime = performance.now();
    const sortedArray = heapSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    this.setState({ array: sortedArray });
    this.setState({ heapSortTime: timeTaken });
  }

  normaliseRange(value) {
    return Math.floor(((value) * 285) / 100) + 5;
  }

  handleSizeChange(opts) {
    const { value } = opts.target;
    const normalisedValue = this.normaliseRange(value);
    this.setState({ arraySize: normalisedValue })
    this.resetArray(normalisedValue);
  }

  render() {
    const { auxArr, mergeSortTime, bubbleSortTime, quickSortTime, heapSortTime, arraySize } = this.state;
    const barWidth = Math.floor(700 / auxArr.length);
    return (
      <div className="array-container">
        <div className='heading'> Sorting Visualiser </div>
        <div className="elements-display">
          {auxArr.map((value, idx) => {
            return (
              <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: BASE_COLOR }}>
              </div>
            )
          })}
        </div>
        <div className="button-container">
          <button className="algorithmButton" onClick={() => this.resetArray()}>Refresh Array</button>
          <button className="algorithmButton" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className="algorithmButton" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className="algorithmButton" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="algorithmButton" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="algorithmButton" onClick={() => this.testSortingAlgo()}>Test Sorting algorithm</button>
          <button className="algorithmButton" onClick={() => this.openNewPanel()}>Visualize All Together</button>
        </div>
        <div className='size-container'>
          <div className="algorithmButton" style={{ marginTop: `15px` }}>Adjust array size </div>
          <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSizeChange(target)} />
          <div className="algorithmButton" style={{ marginTop: `15px` }}>{arraySize}</div>
        </div>
        <div>
          <p>Merge Sort took: {mergeSortTime.toFixed(5)} milliseconds | Bubble Sort took: {bubbleSortTime.toFixed(5)} milliseconds | Quick Sort took: {quickSortTime.toFixed(5)} milliseconds | Heap Sort took: {heapSortTime.toFixed(5)} milliseconds</p>
        </div>
      </div>
    )
  }
}

export default SortVisualiser;
