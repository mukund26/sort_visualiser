import React from 'react';
import './SortVisualiser.css';
import * as SortingAlgos from '../SortingAlgos/sorting_algorithms.js';

// Show all soring algorithms at once in separate grids and then their graphs and visualisations
// print the time complexity and space complexity of each algorithm in the grid
// print the value of time taken to sort the array in the grid for each algorithm 
// print the value of time with animation and without it 
// all sorting algo boxes should be of same size and should be responsive and print all value corresponding to it
// factory pattern for all sorting algorithms
// do not allow sorting on slready sorted array or allowed re run code and update correctly

const NUMBER_OF_ARRAY_BARS = 350; // Number of bars in the array -> make it dynamic (ask user)

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
    this.setState({ auxArr: array })
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
      const manualSortedArr = SortingAlgos.quickSort(arr.slice());
      console.log(this.verifySortingAlgo(jsSortedArr, manualSortedArr));
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
    // const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const startTime = performance.now();
    const sortedArray = SortingAlgos.mergeSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    this.setState({ mergeSortTime: timeTaken });
    this.setState({ array: sortedArray });
    // console.log(`Merge sort took ${endTime - startTime} milliseconds`)
    // console.log(this.verifySortingAlgo(jsSortedArray, sortedArray));
  }

  heightSwap(a, b) {
    const temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
  }

  bubbleSort() {
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const startTime = performance.now();
    this.setState({ array: this.state.auxArr })
    const sortedArray = SortingAlgos.bubbleSort(this.state.array);
    for (let i = 0; i < sortedArray.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, funcVal] = sortedArray[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (funcVal === 'compare') {
        if (i > 1 && sortedArray[i - 1][2] !== 'compare') {
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
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    // console.log(this.verifySortingAlgo(jsSortedArray, sortedArray));
    this.setState({ bubbleSortTime: timeTaken });
    this.setState({ auxArr: jsSortedArray })
  }

  quickSort() {
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const startTime = performance.now();
    const sortedArray = SortingAlgos.quickSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    console.log(this.verifySortingAlgo(jsSortedArray, sortedArray));
    this.setState({ quickSortTime: timeTaken });
  }

  heapSort() {
    const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const startTime = performance.now();
    const sortedArray = SortingAlgos.heapSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    console.log(this.verifySortingAlgo(jsSortedArray, sortedArray));
    this.setState({ array: sortedArray });
    this.setState({ heapSortTime: timeTaken });
  }

  normaliseRange(value) {
    return Math.floor(((value) * 345)/100) + 5;
  }

  handleSizeChange(opts) {
    const { value } = opts.target;
    const normalisedValue = this.normaliseRange(value);
    this.setState({ arraySize: normalisedValue })
    this.resetArray(normalisedValue);
  }

  render() {
    const { array, mergeSortTime, bubbleSortTime, quickSortTime, heapSortTime } = this.state;
    const barWidth = Math.floor(700 / array.length);
    return (
      <div className="array-container">
        <div className='heading'> Sorting Visualiser </div>
        <div className="elements-display">
          {array.map((value, idx) => {
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
          <div className="algorithmButton" style={{ marginTop: `15px`}}>Adjust array size </div>
          <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSizeChange(target)}/>
        </div>
        <div>
          <p>Merge Sort took: {mergeSortTime.toFixed(5)} milliseconds | Bubble Sort took: {bubbleSortTime.toFixed(5)} milliseconds | Quick Sort took: {quickSortTime.toFixed(5)} milliseconds | Heap Sort took: {heapSortTime.toFixed(5)} milliseconds</p>
        </div>
      </div>
    )
  }
}

export default SortVisualiser;