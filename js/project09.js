document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('array-container');
    const commentary = document.getElementById('commentary');
    const algorithmSelect = document.getElementById('algorithm');
    const speedInput = document.getElementById('speed');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
  
    let array = [];
    const arraySize = 20;
    let isSorting = false;
  
    function createRandomArray() {
      stopSorting(); // Stop any ongoing sorting
      array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
      renderArray();
      commentary.textContent = 'Array reset. Select a sorting algorithm and click "Start Sorting".';
    }
  
    function renderArray(selectedIndices = [], sortedIndices = []) {
      arrayContainer.innerHTML = '';
      array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
  
        if (selectedIndices.includes(index)) {
          bar.classList.add('selected');
        }
  
        if (sortedIndices.includes(index)) {
          bar.classList.add('sorted');
        }
  
        arrayContainer.appendChild(bar);
      });
    }
  
    async function bubbleSort() {
      isSorting = true;
      commentary.textContent = 'Bubble Sort: Starting...';
      for (let i = 0; i < array.length - 1 && isSorting; i++) {
        for (let j = 0; j < array.length - i - 1 && isSorting; j++) {
          renderArray([j, j + 1]);
  
          if (array[j] > array[j + 1]) {
            commentary.textContent = `Bubble Sort: Swapping ${array[j]} and ${array[j + 1]}.`;
            await sleep(getSpeed());
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            renderArray([j, j + 1]);
          }
          await sleep(getSpeed());
        }
        renderArray([], [...Array(array.length).keys()].slice(array.length - i - 1));
      }
      renderArray([], [...Array(array.length).keys()]);
      commentary.textContent = 'Bubble Sort: Completed!';
      isSorting = false;
    }
  
    async function insertionSort() {
      isSorting = true;
      commentary.textContent = 'Insertion Sort: Starting...';
      for (let i = 1; i < array.length && isSorting; i++) {
        let key = array[i];
        let j = i - 1;
  
        commentary.textContent = `Insertion Sort: Picking up ${key}.`;
        renderArray([i]);
  
        await sleep(getSpeed());
  
        while (j >= 0 && array[j] > key && isSorting) {
          commentary.textContent = `Insertion Sort: Moving ${array[j]} to position ${j + 1}.`;
          array[j + 1] = array[j];
          j--;
          renderArray([j + 1], [...Array(array.length).keys()].slice(0, i));
          await sleep(getSpeed());
        }
        array[j + 1] = key;
  
        commentary.textContent = `Insertion Sort: Placed ${key} at position ${j + 1}.`;
        renderArray([], [...Array(array.length).keys()].slice(0, i + 1));
        await sleep(getSpeed());
      }
      commentary.textContent = 'Insertion Sort: Completed!';
      renderArray([], [...Array(array.length).keys()]);
      isSorting = false;
    }
  
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    function getSpeed() {
      // Reverse the speed slider: slowest on the left, fastest on the right
      const maxSpeed = 1000; // Slowest speed
      const minSpeed = 50; // Fastest speed
      return maxSpeed - speedInput.value + minSpeed;
    }
  
    function stopSorting() {
      isSorting = false;
    }
  
    startButton.addEventListener('click', () => {
      if (isSorting) return; // Prevent multiple sorts at the same time
      const algorithm = algorithmSelect.value;
      if (algorithm === 'bubble') {
        bubbleSort();
      } else if (algorithm === 'insertion') {
        insertionSort();
      }
    });
  
    resetButton.addEventListener('click', createRandomArray);
  
    // Initialize array
    createRandomArray();
  });
  