import React from 'react';
import { Redirect } from 'react-router-dom';
import './SortVisualiser.css';
import { bubbleSortWithAnimation } from '../SortingAlgos/bubbleSort.js';
import { mergeSortWithAnimation } from '../SortingAlgos/mergeSort.js';
import { quickSort } from '../SortingAlgos/quickSort.js';
import { heapSort } from '../SortingAlgos/heapSort.js';
import * as sortingConstants from './constants.ts'

class MultipleVisualiser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array1: [],
      auxArr1: [],
      array2: [],
      auxArr2: [],
      array3: [],
      auxArr3: [],
      array4: [],
      auxArr4: [],
      arraySize: 0,
      mergeSortTime: 0,
      bubbleSortTime: 0,
      quickSortTime: 0,
      heapSortTime: 0,
      mergeAnimationTime: 0,
      bubbleAnimationTime: 0,
      heapAnimationTime: 0,
      quickAnimationTime: 0,
      speed: 10,
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray(normalisedValue) {
    const array = [];
    const actualSize = normalisedValue ? normalisedValue : this.state.arraySize || sortingConstants.MULTI_NUMBER_OF_ARRAY_BARS;
    for (let i = 0; i < actualSize; i++) {
      array.push(this.randomIntFromInterval(sortingConstants.MULTI_BAR_SIZE.MIN, sortingConstants.MULTI_BAR_SIZE.MAX));
    }
    this.setState({ mergeSortTime: 0, bubbleSortTime: 0, quickSortTime: 0, heapSortTime: 0, arraySize: actualSize });
    this.setState({ auxArr1:  array.slice(), auxArr2:  array.slice(), auxArr3:  array.slice(), auxArr4:  array.slice() })
    this.setState({ array1: array.slice(), array2:  array.slice(), array3:  array.slice(), array4:  array.slice() })
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
    const animation = mergeSortWithAnimation(this.state.array1);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar array1');
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
    const animationEndTime = performance.now()
    const animationTimeTaken = animationEndTime - startTime;
    this.setState({ mergeSortTime: timeTaken, mergeAnimationTime: animationTimeTaken });
  }

  heightSwap(a, b) {
    const temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
  }

  bubbleSort() {
    const startTime = performance.now();
    const animation = bubbleSortWithAnimation(this.state.array3);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar array3');
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
    const animationEndTime = performance.now()
    const animationTimeTaken = animationEndTime - startTime;
    this.setState({ bubbleSortTime: timeTaken, bubbleAnimationTime: animationTimeTaken });
  }

  quickSort() {
    const startTime = performance.now();
    const animation = quickSort(this.state.array2);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    let lastPivot = -1;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar array2');
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
    const animationEndTime = performance.now()
    const animationTimeTaken = animationEndTime - startTime;
    this.setState({ quickSortTime: timeTaken, quickAnimationTime: animationTimeTaken });
  }

  heapSort() {
    const startTime = performance.now();
    const animation = heapSort(this.state.array4);
    const endTime = performance.now()
    const timeTaken = endTime - startTime;
    for (let i = 0; i < animation.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar array4');
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
    const animationEndTime = performance.now()
    const animationTimeTaken = animationEndTime - startTime;
    this.setState({ heapSortTime: timeTaken, heapAnimationTime: animationTimeTaken });
  }

  normaliseRange(value) {
    return Math.floor(((value) * 95) / 100) + 5;
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

  redirectToHome() {
    this.setState({ shouldRedirect: true });
  }

  sortAll() {
    this.bubbleSort()
    this.mergeSort()
    this.quickSort()
    this.heapSort()
  }

  render() {
    const { mergeSortTime, bubbleSortTime, quickSortTime, heapSortTime, arraySize, speed } = this.state;
    const { mergeAnimationTime, bubbleAnimationTime, quickAnimationTime, heapAnimationTime } = this.state;
    const { auxArr1, auxArr2, auxArr3, auxArr4 } = this.state;
    const barWidth = Math.floor(700 / arraySize);

    if (this.state.shouldRedirect) {
        return <Redirect to="/" />;
    }

    return (
      <div className="multi-array-container">
        <div className='top-bar'>
            <button className="home-button" onClick={() => this.redirectToHome()}>Home</button>
            <div className='heading align-heading'> Compare Algorithms </div>
            <button className="sort-button" onClick={() => this.sortAll()}>Sort</button>
        </div>
        <div className='grid-container'>
            <div>
                <div className="grid-item">
                    {auxArr1.map((value, idx) => {
                    return (
                        <div className="array-bar array1" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: sortingConstants.BASE_COLOR }}>
                        </div>
                    )
                    })}
                </div>
                <p>Merge Sort : {mergeSortTime.toFixed(5)} milliseconds | Animation Time: {mergeAnimationTime.toFixed(5)} milliseconds </p>
            </div>
            <div>
                <div className="grid-item">
                    {auxArr2.map((value, idx) => {
                    return (
                        <div className="array-bar array2" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: sortingConstants.BASE_COLOR }}>
                        </div>
                    )
                    })}
                </div>
                <p>Quick Sort : {quickSortTime.toFixed(5)} milliseconds | Animation Time: {quickAnimationTime.toFixed(5)} milliseconds </p>
            </div>
            <div>
                <div className="grid-item">
                    {auxArr3.map((value, idx) => {
                    return (
                        <div className="array-bar array3" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: sortingConstants.BASE_COLOR }}>
                        </div>
                    )
                    })}
                </div>
                <p>Bubble Sort : {bubbleSortTime.toFixed(5)} milliseconds | Animation Time: {bubbleAnimationTime.toFixed(5)} milliseconds </p>
            </div>
            <div>
                <div className="grid-item">
                    {auxArr4.map((value, idx) => {
                    return (
                        <div className="array-bar array4" key={idx} style={{ height: `${value}px`, width: `${barWidth}px`, backgroundColor: sortingConstants.BASE_COLOR }}>
                        </div>
                    )
                    })}
                </div>
                <p>Heap Sort : {heapSortTime.toFixed(5)} milliseconds | Animation Time: {heapAnimationTime.toFixed(5)} milliseconds </p>
            </div>
        </div>

        <div className='multi-size-container'>
            <button className="algorithmButton" onClick={() => this.resetArray()}>Refresh Array</button>
            <div>
                <div className="algorithmButton" style={{ marginTop: `15px` }}>Adjust array size </div>
                <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSizeChange(target)} />
                <div className="algorithmButton" style={{ marginTop: `15px` }}>{arraySize}</div>
            </div>
            <div>
                <div className="algorithmButton" style={{ marginTop: `15px` }}>Adjust delay speed </div>
                <input type="range" min="0" max="100" id="changeSize" className='size-adjuster' onChange={(target) => this.handleSpeedChange(target)} />
                <div className="algorithmButton" style={{ marginTop: `15px` }}>{speed}</div>
            </div>
        </div>
      </div> 
    )
  }
}

export default MultipleVisualiser;
