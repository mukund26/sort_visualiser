import React from 'react';
import { Redirect } from 'react-router-dom';
import './SortVisualiser.css';
import { bubbleSortWithAnimation } from '../SortingAlgos/bubbleSort.js';
import { mergeSortWithAnimation } from '../SortingAlgos/mergeSort.js';
import { quickSort } from '../SortingAlgos/quickSort.js';
import { heapSort } from '../SortingAlgos/heapSort.js';
import * as sortingConstants from './constants.ts'

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
      heapSortTime: 0,
      speed: 10,
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray(normalisedValue) {
    const array = [];
    this.setState({ array });
    const actualSize = normalisedValue ? normalisedValue : this.state.arraySize || sortingConstants.NUMBER_OF_ARRAY_BARS;
    for (let i = 0; i < actualSize; i++) {
      array.push(this.randomIntFromInterval(sortingConstants.BAR_SIZE.MIN, sortingConstants.BAR_SIZE.MAX));
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
      heapSort(arr);
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
            barOneStyle.backgroundColor = sortingConstants.BASE_COLOR;
            barTwoStyle.backgroundColor = sortingConstants.BASE_COLOR;
          }, i * this.state.speed);
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
            barTwoStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          }, i * this.state.speed);
        }
      } else {
        setTimeout(() => {
          barOneStyle.height = `${funcVal}px`;
        }, i * this.state.speed);
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
            barOneStyle.backgroundColor = sortingConstants.BASE_COLOR;
            barTwoStyle.backgroundColor = sortingConstants.BASE_COLOR;
          }, i * this.state.speed);
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
            barTwoStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          }, i * this.state.speed);
        }
      } else if (funcVal === 'swap') {
        setTimeout(() => {
          this.heightSwap(arrayBars[barOneIdx], arrayBars[barTwoIdx]);
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          barTwoStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
        }, i * this.state.speed);
      }
    }
    this.setState({ bubbleSortTime: timeTaken });
  }

  quickSort() {
    const startTime = performance.now();
    const animation = quickSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    let lastPivot = -1;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [func] = animation[i];
      if (func === 'pivot') {
        const idx = animation[i][1];
        if (idx !== lastPivot && lastPivot !== -1) {
          setTimeout(() => {
            arrayBars[lastPivot].style.backgroundColor = sortingConstants.BASE_COLOR
          }, i * this.state.speed)
        }
        const barOneStyle = arrayBars[idx].style;
        lastPivot = idx;
        setTimeout(() => {
          barOneStyle.backgroundColor = sortingConstants.PIVOT_COLOUR
        }, i * this.state.speed)
      } else if (func === 'swap') {
        const [funcVal, barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          barTwoStyle.backgroundColor = sortingConstants.PARTITION_COLOUR;
        }, i * this.state.speed)
        setTimeout(() => {
          this.heightSwap(arrayBars[barOneIdx], arrayBars[barTwoIdx]);
        }, i * this.state.speed);
      } else if (func === 'not_swap') {
        const [funcVal, barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          barTwoStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
        }, i * this.state.speed);
      } else {
        const [funcVal, barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = sortingConstants.BASE_COLOR;
          barTwoStyle.backgroundColor = sortingConstants.BASE_COLOR;
        }, i * this.state.speed);
      }
    }
    this.setState({ quickSortTime: timeTaken });
  }

  heapSort() {
    const startTime = performance.now();
    const animation = heapSort(this.state.array);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [func] = animation[i];
      switch (func) {
        case 'root':
          if (animation[i][1] === 'remove') {
            const animationBar = animation[i][2];
            const barStyle = arrayBars[animationBar].style;
            setTimeout(() => {
              barStyle.backgroundColor = sortingConstants.BASE_COLOR;
            }, i * this.state.speed)
          } else {
            const animationBar = animation[i][1];
            const barStyle = arrayBars[animationBar].style;
            setTimeout(() => {
              barStyle.backgroundColor = sortingConstants.PIVOT_COLOUR;
            }, i * this.state.speed)
          }
          break;
        case 'left':
        case 'right':
          const childBar = animation[i][1];
          const childBarStyle = arrayBars[childBar].style;
          setTimeout(() => {
            childBarStyle.backgroundColor = sortingConstants.PARTITION_COLOUR;
          }, i * this.state.speed)
          break;
        case 'maxify':
          const maxBarOne = animation[i][1], maxBarTwo = animation[i][2];
          const maxBarOneStyle = arrayBars[maxBarOne].style;
          const maxBarTwoStyle = arrayBars[maxBarTwo].style;
          setTimeout(() => {
            maxBarOneStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
            maxBarTwoStyle.backgroundColor = sortingConstants.TRANSITION_COLOUR;
          }, i * this.state.speed)
          break;
        case 'swap':
          const swapBarOne = animation[i][1], swapBarTwo = animation[i][2];
          setTimeout(() => {
            this.heightSwap(arrayBars[swapBarOne], arrayBars[swapBarTwo]);
          }, i * this.state.speed)
          break;
        case 'compare': 
          const compBarOne = animation[i][1], compBarTwo = animation[i][2];
          const compBarOneStyle = arrayBars[compBarOne].style;
          const compBarTwoStyle = arrayBars[compBarTwo].style;
          setTimeout(() => {
            compBarOneStyle.backgroundColor = sortingConstants.BASE_COLOR;
            compBarTwoStyle.backgroundColor = sortingConstants.BASE_COLOR;
          }, i * this.state.speed)
          break;
        default:
          const removeBar = animation[i][1];
          const removeBarStyle = arrayBars[removeBar].style;
          setTimeout(() => {
            removeBarStyle.backgroundColor = sortingConstants.BASE_COLOR;
          }, i * this.state.speed)
      }
    }
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

  normaliseSpeedRange(value) {
    return Math.floor(((value) * 45) / 100) + 5;
  }

  handleSpeedChange(opts) {
    const { value } = opts.target;
    const normalisedValue = this.normaliseSpeedRange(value);
    this.setState({ speed: normalisedValue })
  }

  handleVisualiseAll() {
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { auxArr, mergeSortTime, bubbleSortTime, quickSortTime, heapSortTime, arraySize, speed } = this.state;
    const barWidth = Math.floor(700 / auxArr.length);
    if (this.state.shouldRedirect) {
      return <Redirect to="/visualise" />;
    }

    return (
      <div className="array-container">
        <div className='heading'> Sorting Visualiser </div>
        <div className="elements-display">
          {auxArr.map((value, idx) => {
            return (
              <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: sortingConstants.BASE_COLOR }}>
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
          {/* <button className="algorithmButton" onClick={() => this.testSortingAlgo()}>Test Sorting algorithm</button> */}
          <button className="algorithmButton" onClick={() => this.handleVisualiseAll()}>Visualize All Together</button>
        </div>
        <div className='size-container'>
          <div className="algorithmButton scroller-placement" style={{ marginTop: `15px` }}>Adjust array size </div>
          <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSizeChange(target)} />
          <div className="algorithmButton" style={{ marginTop: `15px` }}>{arraySize}</div>
        </div>
        <div className='size-container'>
          <div className="algorithmButton scroller-placement" style={{ marginTop: `15px` }}>Adjust delay speed </div>
          <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSpeedChange(target)} />
          <div className="algorithmButton" style={{ marginTop: `15px` }}>{speed}</div>
        </div>
        <div>
          <p>Merge Sort took: {mergeSortTime.toFixed(5)} milliseconds | Bubble Sort took: {bubbleSortTime.toFixed(5)} milliseconds | Quick Sort took: {quickSortTime.toFixed(5)} milliseconds | Heap Sort took: {heapSortTime.toFixed(5)} milliseconds</p>
        </div>
      </div>
    )
  }
}

export default SortVisualiser;
