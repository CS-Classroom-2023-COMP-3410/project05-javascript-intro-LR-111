document.addEventListener('DOMContentLoaded', () => {
    const storyTextElement = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const progressList = document.getElementById('progress-list');
    const saveButton = document.getElementById('save-progress');
    const loadButton = document.getElementById('load-progress');
    const resetButton = document.getElementById('reset-game');
  
    const story = {
      start: {
        text: "You wake up in a dense forest. Two paths lie ahead of you.",
        choices: [
          { text: "Take the left path", next: "left_path" },
          { text: "Take the right path", next: "right_path" },
        ],
      },
      left_path: {
        text: "You encounter a river with a small boat nearby.",
        choices: [
          { text: "Take the boat", next: "boat_trip" },
          { text: "Follow the river on foot", next: "follow_river" },
        ],
      },
      right_path: {
        text: "You come across a mysterious old cabin.",
        choices: [
          { text: "Enter the cabin", next: "enter_cabin" },
          { text: "Walk past it", next: "ignore_cabin" },
        ],
      },
      boat_trip: {
        text: "The boat leads you to an island with a treasure chest.",
        choices: [
          { text: "Open the chest", next: "treasure" },
          { text: "Leave it alone", next: "leave_treasure" },
        ],
      },
      follow_river: {
        text: "You follow the river and find a peaceful clearing. You win!",
        choices: [],
      },
      enter_cabin: {
        text: "Inside the cabin, you find a map and a key.",
        choices: [
          { text: "Follow the map", next: "follow_map" },
          { text: "Keep exploring", next: "explore_cabin" },
        ],
      },
      ignore_cabin: {
        text: "You walk past the cabin and are ambushed by a pack of wolves. You lose!",
        choices: [],
      },
      treasure: {
        text: "You open the chest and find gold coins. You win!",
        choices: [],
      },
      leave_treasure: {
        text: "You leave the treasure and row back to safety. You win!",
        choices: [],
      },
      follow_map: {
        text: "The map leads you to a hidden cave with ancient artifacts. You win!",
        choices: [],
      },
      explore_cabin: {
        text: "You find nothing else of interest and decide to leave. You win!",
        choices: [],
      },
    };
  
    let currentNode = 'start';
    let progress = [];
  
    function displayStory(node) {
      const current = story[node];
      storyTextElement.textContent = current.text;
  
      // Update progress
      if (!progress.includes(node)) progress.push(node);
      updateProgressBar();
  
      // Clear and display choices
      choicesContainer.innerHTML = '';
      current.choices.forEach((choice) => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.textContent = choice.text;
        button.addEventListener('click', () => {
          currentNode = choice.next;
          displayStory(currentNode);
        });
        choicesContainer.appendChild(button);
      });
    }
  
    function updateProgressBar() {
      progressList.innerHTML = '';
      progress.forEach((node, index) => {
        const li = document.createElement('li');
        li.textContent = story[node].text.substring(0, 20) + '...';
        if (index === progress.length - 1) {
          li.classList.add('current');
        }
        progressList.appendChild(li);
      });
    }
  
    function saveProgress() {
      localStorage.setItem('storyNode', currentNode);
      localStorage.setItem('progress', JSON.stringify(progress));
      alert('Progress saved!');
    }
  
    function loadProgress() {
      const savedNode = localStorage.getItem('storyNode');
      const savedProgress = JSON.parse(localStorage.getItem('progress'));
      if (savedNode && savedProgress) {
        currentNode = savedNode;
        progress = savedProgress;
        displayStory(currentNode);
        alert('Progress loaded!');
      } else {
        alert('No saved progress found.');
      }
    }
  
    function resetGame() {
      currentNode = 'start';
      progress = [];
      displayStory(currentNode);
    }
  
    saveButton.addEventListener('click', saveProgress);
    loadButton.addEventListener('click', loadProgress);
    resetButton.addEventListener('click', resetGame);
  
    // Initialize the game
    displayStory(currentNode);
  });
  