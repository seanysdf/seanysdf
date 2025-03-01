// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make message board rows clickable
  const messageRows = document.querySelectorAll('.message-row');
  messageRows.forEach(row => {
    row.addEventListener('click', function() {
      const url = this.getAttribute('data-post-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  // Add fancy cursor trail effect
  let trail = [];
  const trailLength = 8;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.width = (8 - i) + 'px';
    dot.style.height = (8 - i) + 'px';
    dot.style.backgroundColor = `hsl(${i * 30}, 100%, 50%)`;
    dot.style.position = 'fixed';
    dot.style.borderRadius = '50%';
    dot.style.zIndex = '9999';
    dot.style.pointerEvents = 'none';
    dot.style.opacity = 1 - (i / trailLength);
    document.body.appendChild(dot);
    trail.push({element: dot, x: 0, y: 0});
  }
  
  document.addEventListener('mousemove', e => {
    // Update first dot position directly to cursor
    trail[0].x = e.clientX;
    trail[0].y = e.clientY;
    trail[0].element.style.left = `${trail[0].x}px`;
    trail[0].element.style.top = `${trail[0].y}px`;
    
    // Update the rest with delay
    for (let i = 1; i < trail.length; i++) {
      setTimeout(() => {
        trail[i].x = trail[i-1].x;
        trail[i].y = trail[i-1].y;
        trail[i].element.style.left = `${trail[i].x}px`;
        trail[i].element.style.top = `${trail[i].y}px`;
      }, i * 30);
    }
  });

  // Update visitor counter in local storage
  const counterElement = document.querySelector('.counter');
  if (counterElement) {
    let count = parseInt(localStorage.getItem('visitorCount') || '1337');
    counterElement.textContent = count;
    localStorage.setItem('visitorCount', (count + 1).toString());
  }
  
  // Add "Under Construction" blink animation
  const constructionElements = document.querySelectorAll('.under-construction');
  constructionElements.forEach(el => {
    setInterval(() => {
      el.style.visibility = el.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 800);
  });
});