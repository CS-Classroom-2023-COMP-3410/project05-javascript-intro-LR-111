document.addEventListener('DOMContentLoaded', () => {
    const clock = document.getElementById('clock');
    const formatSelector = document.getElementById('format');
    const colorPicker = document.getElementById('color');
    const fontSizeInput = document.getElementById('fontSize');
    const setAlarmButton = document.getElementById('setAlarm');
    const alarmControls = document.getElementById('alarmControls');
    const saveAlarmButton = document.getElementById('saveAlarm');
    const cancelAlarmButton = document.getElementById('cancelAlarm');
    const alarmTimeInput = document.getElementById('alarmTime');
  
    let timeFormat = localStorage.getItem('timeFormat') || '24';
    let clockColor = localStorage.getItem('clockColor') || '#000000';
    let fontSize = localStorage.getItem('fontSize') || '32';
    let alarmTime = localStorage.getItem('alarmTime') || null;
  
    // Initialize settings
    formatSelector.value = timeFormat;
    colorPicker.value = clockColor;
    fontSizeInput.value = fontSize;
    clock.style.color = clockColor;
    clock.style.fontSize = `${fontSize}px`;
  
    // Update the clock every second
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
  
      if (timeFormat === '12') {
        hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      }
  
      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':');
  
      clock.textContent = formattedTime;
  
      // Check for alarm
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      if (alarmTime === currentTime) {
        alert('Alarm ringing!');
        alarmTime = null; // Reset alarm after ringing
        localStorage.removeItem('alarmTime');
      }
    }
  
    setInterval(updateClock, 1000);
  
    // Event Listeners
    formatSelector.addEventListener('change', (e) => {
      timeFormat = e.target.value;
      localStorage.setItem('timeFormat', timeFormat);
    });
  
    colorPicker.addEventListener('input', (e) => {
      clockColor = e.target.value;
      clock.style.color = clockColor;
      localStorage.setItem('clockColor', clockColor);
    });
  
    fontSizeInput.addEventListener('input', (e) => {
      fontSize = e.target.value;
      clock.style.fontSize = `${fontSize}px`;
      localStorage.setItem('fontSize', fontSize);
    });
  
    setAlarmButton.addEventListener('click', () => {
      alarmControls.style.display = 'block';
    });
  
    saveAlarmButton.addEventListener('click', () => {
      alarmTime = alarmTimeInput.value;
      if (alarmTime) {
        localStorage.setItem('alarmTime', alarmTime);
        alert(`Alarm set for ${alarmTime}`);
        alarmControls.style.display = 'none';
      } else {
        alert('Please set a valid alarm time.');
      }
    });
  
    cancelAlarmButton.addEventListener('click', () => {
      alarmControls.style.display = 'none';
    });
  
    // Initial Clock Update
    updateClock();
  });
  