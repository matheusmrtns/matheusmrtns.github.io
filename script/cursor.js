const $Ball = document.querySelector('.ball');
const $hover = document.querySelectorAll('a'); // Selecting all anchor tags
const cursor = document.getElementById("cursor");

// Listeners for link hover effects
$hover.forEach(link => {
  link.addEventListener('mouseenter', onMouseHoverLink);
  link.addEventListener('mouseleave', onMouseHoverOutLink);
});

// Custom cursor movement
document.body.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Function for link hover effect
function onMouseHoverLink() {
  cursor.style.backdropFilter = 'blur(3px)';
  cursor.style.background = 'transparent';
  TweenMax.to($Ball, .3, {
    scale: 3
  });
}

// Function for link hover out effect
function onMouseHoverOutLink() {
  cursor.style.backdropFilter = 'blur(5px)';
  cursor.style.background = '#aaa';
  TweenMax.to($Ball, .3, {
    scale: 1
  });
}
