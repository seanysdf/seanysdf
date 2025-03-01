// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add some 90s-00s flair with cursor trails
  const cursorTrail = document.createElement('div');
  cursorTrail.className = 'cursor-trail';
  document.body.appendChild(cursorTrail);

  let trailElements = [];
  const trailLength = 10;

  for (let i = 0; i < trailLength; i++) {
    const trailElement = document.createElement('div');
    trailElement.className = 'trail';
    trailElement.style.width = '8px';
    trailElement.style.height = '8px';
    trailElement.style.backgroundColor = `hsl(${i * 36}, 100%, 50%)`;
    trailElement.style.borderRadius = '50%';
    trailElement.style.position = 'fixed';
    trailElement.style.zIndex = '9999';
    trailElement.style.opacity = 1 - (i / trailLength);
    trailElement.style.pointerEvents = 'none';
    document.body.appendChild(trailElement);
    trailElements.push({
      element: trailElement,
      x: 0,
      y: 0
    });
  }

  // Update cursor trail positions
  document.addEventListener('mousemove', function(e) {
    // Update first element to cursor position
    trailElements[0].x = e.clientX;
    trailElements[0].y = e.clientY;
    trailElements[0].element.style.left = `${trailElements[0].x}px`;
    trailElements[0].element.style.top = `${trailElements[0].y}px`;
    
    // Update the rest of the trail to follow
    for (let i = 1; i < trailElements.length; i++) {
      setTimeout(() => {
        trailElements[i].x = trailElements[i-1].x;
        trailElements[i].y = trailElements[i-1].y;
        trailElements[i].element.style.left = `${trailElements[i].x}px`;
        trailElements[i].element.style.top = `${trailElements[i].y}px`;
      }, i * 20);
    }
  });

  // Add fancy hover effects to buttons
  const buttons = document.querySelectorAll('a.button-3d, nav a');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.transition = 'all 0.3s';
    });
  });

  // Increment visitor counter (just for fun, not actually tracking)
  const counter = document.querySelector('.counter');
  if (counter) {
    let count = parseInt(localStorage.getItem('visitorCount') || '1337');
    count++;
    counter.textContent = count;
    localStorage.setItem('visitorCount', count.toString());
  }
});
