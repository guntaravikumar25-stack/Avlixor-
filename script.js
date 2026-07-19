// Replace the old simple toggle code with this dynamic Stack Card engine
const container = document.querySelector('.stack-cards-container');
if (container) {
  const cards = Array.from(container.querySelectorAll('.eagle-card'));
  let currentActiveIndex = 0;

  function updateCardStack() {
    cards.forEach((card, index) => {
      // Clear existing state layouts
      card.classList.remove('active', 'stack-back', 'stack-deep');
      
      // Calculate dynamic array position relative to the currently active card index
      if (index === currentActiveIndex) {
        card.classList.add('active');
      } else if (index === (currentActiveIndex + 1) % cards.length) {
        card.classList.add('stack-back');
      } else if (index === (currentActiveIndex + 2) % cards.length) {
        card.classList.add('stack-deep');
      }
    });
  }

  // Bind individual click listeners to shuffle the card order down the stack deck
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      // Cycle to the next sequential element layer index array position
      currentActiveIndex = (currentActiveIndex + 1) % cards.length;
      updateCardStack();
    });
  });

  // Initialize display arrays positions maps on document generation load lifecycle
  updateCardStack();
}
