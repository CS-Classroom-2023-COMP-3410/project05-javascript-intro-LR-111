document.addEventListener('DOMContentLoaded', () => {
  const difficultySelect = document.getElementById('difficulty');
  const startButton = document.getElementById('start');
  const restartButton = document.getElementById('restart');
  const textToTypeDiv = document.getElementById('text-to-type');
  const userInput = document.getElementById('user-input');
  const wpmSpan = document.getElementById('wpm');
  const accuracySpan = document.getElementById('accuracy');

  let targetText = '';
  let startTime = null;
  let timerInterval = null;
  let hasStartedTyping = false;

  const textSamples = {
    easy: ['cat', 'dog', 'bat', 'rat', 'hat', 'log'],
    medium: [
      'The quick brown fox jumps over the lazy dog.',
      'Typing is fun and educational.',
      'I enjoy solving programming puzzles.',
    ],
    hard: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sphinx of black quartz, judge my vow.',
      'Pack my box with five dozen liquor jugs.',
    ],
  };

  function generateRandomText(difficulty) {
    const samples = textSamples[difficulty];
    return samples[Math.floor(Math.random() * samples.length)];
  }

  function calculateWPM(startTime, currentTime, typedText) {
    const elapsedMinutes = (currentTime - startTime) / 60000;
    const wordCount = typedText.trim().split(/\s+/).length;
    return Math.round(wordCount / elapsedMinutes) || 0;
  }

  function calculateAccuracy(target, typed) {
    let correctChars = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === target[i]) correctChars++;
    }
    return Math.round((correctChars / target.length) * 100);
  }

  function startTraining() {
    // Generate text based on difficulty
    targetText = generateRandomText(difficultySelect.value);
    textToTypeDiv.textContent = targetText;

    // Reset user input and stats
    userInput.value = '';
    userInput.disabled = false;
    userInput.classList.remove('error', 'success');
    userInput.focus();

    wpmSpan.textContent = '0';
    accuracySpan.textContent = '100%';

    // Reset state
    startTime = null;
    hasStartedTyping = false;

    // Update stats in real-time
    timerInterval = setInterval(() => {
      const typedText = userInput.value;
      const currentTime = new Date().getTime();

      // Start timing when typing begins
      if (!hasStartedTyping && typedText.length > 0) {
        startTime = currentTime;
        hasStartedTyping = true;
      }

      // Calculate WPM only after typing begins
      if (hasStartedTyping) {
        const wpm = calculateWPM(startTime, currentTime, typedText);
        wpmSpan.textContent = wpm;
      }

      // Update Accuracy
      const accuracy = calculateAccuracy(targetText, typedText);
      accuracySpan.textContent = `${accuracy}%`;

      // Highlight correctness of the input
      if (targetText.startsWith(typedText)) {
        userInput.classList.remove('error');
        userInput.classList.add('success');
      } else {
        userInput.classList.remove('success');
        userInput.classList.add('error');
      }

      // Check if typing is complete
      if (typedText === targetText) {
        clearInterval(timerInterval); // Stop the timer
        finalizeResults(wpmSpan.textContent, accuracy);
      }
    }, 100);
  }

  function finalizeResults(finalWPM, finalAccuracy) {
    userInput.disabled = true;
    userInput.classList.add('success');
    restartButton.style.display = 'inline-block';

    const summary = `
      <p>Great job! Here are your results:</p>
      <p><strong>Words per Minute (WPM):</strong> ${finalWPM}</p>
      <p><strong>Accuracy:</strong> ${finalAccuracy}%</p>
    `;
    textToTypeDiv.innerHTML = summary;
  }

  function stopTraining() {
    clearInterval(timerInterval);
  }

  function resetTrainer() {
    stopTraining();
    textToTypeDiv.textContent = 'Click "Start Training" to begin.';
    userInput.value = '';
    userInput.disabled = true;
    userInput.classList.remove('error', 'success');
    wpmSpan.textContent = '0';
    accuracySpan.textContent = '100%';
    restartButton.style.display = 'none';
  }

  // Event Listeners
  startButton.addEventListener('click', startTraining);
  restartButton.addEventListener('click', resetTrainer);

  // Initialize Trainer
  resetTrainer();
});
