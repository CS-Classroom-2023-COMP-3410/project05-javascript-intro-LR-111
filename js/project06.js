document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const searchBar = document.getElementById('search-bar');
    const elementDetails = document.getElementById('element-details');
  
    const elements = [
      { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', group: 'Nonmetal' },
      { atomicNumber: 2, symbol: 'He', name: 'Helium', group: 'Noble Gas' },
      { atomicNumber: 3, symbol: 'Li', name: 'Lithium', group: 'Alkali Metal' },
      { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', group: 'Alkaline Earth Metal' },
      { atomicNumber: 5, symbol: 'B', name: 'Boron', group: 'Metalloid' },
      { atomicNumber: 6, symbol: 'C', name: 'Carbon', group: 'Nonmetal' },
      { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', group: 'Nonmetal' },
      { atomicNumber: 8, symbol: 'O', name: 'Oxygen', group: 'Nonmetal' },
      { atomicNumber: 9, symbol: 'F', name: 'Fluorine', group: 'Halogen' },
      { atomicNumber: 10, symbol: 'Ne', name: 'Neon', group: 'Noble Gas' },
      // Additional elements can be added here...
    ];
  
    function createGrid() {
      periodicTable.innerHTML = '';
      elements.forEach((element) => {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.textContent = element.symbol;
        elementDiv.dataset.atomicNumber = element.atomicNumber;
        elementDiv.dataset.group = element.group;
  
        elementDiv.addEventListener('click', () => {
          highlightElement(element.atomicNumber);
          displayElementDetails(element);
        });
  
        periodicTable.appendChild(elementDiv);
      });
    }
  
    function displayElementDetails(element) {
      elementDetails.innerHTML = `
        <strong>Atomic Number:</strong> ${element.atomicNumber}<br>
        <strong>Symbol:</strong> ${element.symbol}<br>
        <strong>Name:</strong> ${element.name}<br>
        <strong>Group:</strong> ${element.group}
      `;
    }
  
    function highlightElement(atomicNumber) {
      const allElements = document.querySelectorAll('.element');
      allElements.forEach((el) => {
        el.classList.remove('selected');
        el.classList.remove('group-highlight');
      });
  
      const selectedElement = document.querySelector(
        `.element[data-atomic-number="${atomicNumber}"]`
      );
      selectedElement.classList.add('selected');
  
      // Highlight all elements in the same group
      const group = selectedElement.dataset.group;
      const groupElements = document.querySelectorAll(
        `.element[data-group="${group}"]`
      );
      groupElements.forEach((el) => el.classList.add('group-highlight'));
    }
  
    function searchElement(query) {
      const queryLower = query.toLowerCase();
      const result = elements.find(
        (el) =>
          el.name.toLowerCase().includes(queryLower) ||
          el.symbol.toLowerCase().includes(queryLower) ||
          el.atomicNumber.toString() === query
      );
  
      if (result) {
        highlightElement(result.atomicNumber);
        displayElementDetails(result);
      } else {
        elementDetails.textContent = 'No matching element found.';
      }
    }
  
    searchBar.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query) {
        searchElement(query);
      } else {
        elementDetails.textContent = 'Click on an element to see its details.';
        const allElements = document.querySelectorAll('.element');
        allElements.forEach((el) => {
          el.classList.remove('selected');
          el.classList.remove('group-highlight');
        });
      }
    });
  
    // Initialize grid
    createGrid();
  });
  