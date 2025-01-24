document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const brushSizeInput = document.getElementById('brush-size');
    const brushSizeDisplay = document.getElementById('brush-size-display');
    const brushColorInput = document.getElementById('brush-color');
    const bgColorInput = document.getElementById('canvas-bg-color');
    const undoButton = document.getElementById('undo');
    const clearButton = document.getElementById('clear');
    const saveButton = document.getElementById('save');
  
    const canvasWidth = 800;
    const canvasHeight = 600;
  
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  
    // Initialize settings
    let brushSize = parseInt(brushSizeInput.value);
    let brushColor = brushColorInput.value;
    let bgColor = bgColorInput.value;
    let isDrawing = false;
    let undoStack = [];
  
    // Set initial canvas background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
    // Update brush size display
    brushSizeInput.addEventListener('input', (e) => {
      brushSize = parseInt(e.target.value);
      brushSizeDisplay.textContent = brushSize;
    });
  
    // Update brush color
    brushColorInput.addEventListener('input', (e) => {
      brushColor = e.target.value;
    });
  
    // Update canvas background color
    bgColorInput.addEventListener('input', (e) => {
      bgColor = e.target.value;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      redraw();
    });
  
    // Start drawing
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(getCanvasCoordinates(e).x, getCanvasCoordinates(e).y);
      saveCanvasState();
    });
  
    // Draw on canvas
    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const { x, y } = getCanvasCoordinates(e);
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = brushColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    });
  
    // Stop drawing
    canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      ctx.closePath();
    });
  
    // Undo the last stroke
    undoButton.addEventListener('click', () => {
      if (undoStack.length > 0) {
        const imageData = undoStack.pop();
        ctx.putImageData(imageData, 0, 0);
      }
    });
  
    // Clear the canvas
    clearButton.addEventListener('click', () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      undoStack = [];
    });
  
    // Save the canvas as an image
    saveButton.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'drawing.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  
    // Helper function to get canvas coordinates
    function getCanvasCoordinates(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  
    // Save current canvas state for undo
    function saveCanvasState() {
      if (undoStack.length >= 10) undoStack.shift(); // Limit undo stack size to 10
      undoStack.push(ctx.getImageData(0, 0, canvasWidth, canvasHeight));
    }
  
    // Redraw canvas after background color changes
    function redraw() {
      if (undoStack.length > 0) {
        ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
      }
    }
  });
  