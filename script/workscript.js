document.addEventListener('DOMContentLoaded', function () {
  const parallaxElements = document.querySelectorAll('.parallax');

  // Dropdown menu elements
  const iconMobile = document.getElementById('icon_mobile');
  const navbox = document.getElementById('navbox');
  const iconImage = iconMobile.querySelector('img'); // The image inside #icon_mobile

  // Common style update function
  function updateStyles(styles) {
    Object.keys(styles).forEach(key => {
      styles[key].elements.forEach(element => {
        element.style[key] = styles[key].value;
      });
    });
  }

  // Handle scroll event
  window.addEventListener('scroll', function () {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      const isLargeScreen = screenWidth > 980;
      const maxScroll = isLargeScreen ? 700 : 1000;

      const parallaxValue = isLargeScreen ?
        Math.max(-scrollY / 2, -maxScroll) :
        Math.max(-scrollY / 4, -maxScroll); // mobile (slower movement)

      // Update styles for elements with parallax
      updateStyles({
        transform: {
          elements: parallaxElements,
          value: `translateY(${parallaxValue}px)`
        }
      });
    });
  });

  // Handle the dropdown menu for mobile
  iconMobile.addEventListener('click', function () {
    // Toggle the display of the navbox
    if (navbox.classList.contains('navbox-visible')) {
      navbox.classList.remove('navbox-visible'); // Hide the navbox
      iconImage.classList.remove('rotated'); // Reset icon rotation
    } else {
      navbox.classList.add('navbox-visible'); // Show the navbox
      iconImage.classList.add('rotated'); // Rotate icon
    }
  });

  // Close the dropdown when any link inside the navbox is clicked
  const navLinks = navbox.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navbox.classList.remove('navbox-visible'); // Close the dropdown
      iconImage.classList.remove('rotated'); // Reset icon rotation
    });
  });

  //Email copy
  document.getElementById('email').addEventListener('click', function () {
    const emailText = 'hello@verttebra.com'; // The text to be copied
    const copiedMessage = document.getElementById('copied'); // The "copied" message element
    
    // Copy the email text to clipboard
    navigator.clipboard.writeText(emailText).then(() => {
      // Show the copied message
      copiedMessage.classList.add('active');
      
      // Hide the copied message after 1 second
      setTimeout(() => {
        copiedMessage.classList.remove('active');
      }, 800);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });

});