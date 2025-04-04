document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('grid');
  const logo = document.getElementById('logo');
  const navmix = document.getElementById('nav');
  const blurElements = document.querySelectorAll('.blur');
  const darkenElements = document.querySelectorAll('.darken');
  const parallaxElements = document.querySelectorAll('.parallax');
  const serviceButtons = document.querySelectorAll('.service_button');
  const buttonCircles = document.querySelectorAll('.button_circle');
  const sTextDivs = document.querySelectorAll('.s_text');
  
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
      const opacityValue = 1 - Math.min(scrollY / maxScroll, 1);

      // Adjust darken effect speed for mobile (slower transition)
      const darkenValue = isLargeScreen ? 
        1 - Math.min(scrollY / maxScroll, 1) : 
        1 - Math.min(scrollY / 2 / maxScroll, 1); // Slower darken on mobile

      const parallaxValue = isLargeScreen ?
        Math.max(-scrollY / 2, -maxScroll) :
        Math.max(-scrollY / 3, -maxScroll); // mobile (slower movement)

      // Update logo, navmix, and grid opacity
      updateStyles({
        top: {
          elements: [logo],
          value: isLargeScreen ? (scrollY > 50 ? '60px' : '42vh') : (scrollY > 50 ? '100px' : '30vh')
        },
        width: {
          elements: [logo],
          value: isLargeScreen ? (scrollY > 50 ? '150px' : '600px') : (scrollY > 50 ? '270px' : '600px')
        },
        mixBlendMode: {
          elements: [navmix],
          value: scrollY > 50 ? 'difference' : 'normal'
        },
        opacity: {
          elements: [grid],
          value: (scrollY > (isLargeScreen ? 400 : 700)) ? '1' : '0'
        }
      });

      // Update styles for elements with blur, darken, and parallax
      updateStyles({
        opacity: {
          elements: blurElements,
          value: opacityValue
        },
        filter: {
          elements: darkenElements,
          value: `brightness(${darkenValue})`
        },
        transform: {
          elements: parallaxElements,
          value: `translateY(${parallaxValue}px)`
        }
      });

      // Handle service buttons for both desktop and mobile
      if (isLargeScreen) {
        handleServiceButtonsDesktop();
        adjustLayoutForLargeScreens(); // Adjust layout for desktop
      } else {
        handleServiceButtonsMobile();
      }
    });
  });

  // Handle service button behavior for desktop screens
  function handleServiceButtonsDesktop() {
    if (buttonCircles[0]) buttonCircles[0].dataset.selected = 'true';

    serviceButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        resetButtonsAndCircles();
        this.style.width = '90%';
        this.style.backgroundColor = '#1e1e1e';
        this.style.color = '#fcfcfc';
        this.style.marginLeft = '3.25%';

        if (buttonCircles[index]) {
          buttonCircles[index].style.backgroundColor = '#1e1e1e';
          buttonCircles[index].style.transform = 'translateX(-86%)';
          buttonCircles[index].dataset.selected = 'true';
        }

        const translateValue = -378 * index;
        sTextDivs.forEach(text => text.style.transform = `translateY(${translateValue}px)`);
      });

      button.addEventListener('mouseover', () => highlightCircle(index));
      button.addEventListener('mouseout', () => resetCircle(index));
    });
  }

  // Handle service button behavior for mobile screens
  function handleServiceButtonsMobile() {
    serviceButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        resetButtonsAndCircles();
        this.style.backgroundColor = '#1e1e1e';
        this.style.color = '#fcfcfc';
        this.style.paddingLeft = '90px';
        this.style.marginLeft = '100px';

        if (buttonCircles[index]) {
          buttonCircles[index].style.backgroundColor = '#1e1e1e';
        }

        const translateValue = -467 * index;
        sTextDivs.forEach(text => text.style.transform = `translateY(${translateValue}px)`);
      });
    });
  }

  // Prevent layout overlap for large screens by adjusting service section layout
  function adjustLayoutForLargeScreens() {
    const serviceSection = document.querySelector('.service-section');
    if (serviceSection) {
      serviceSection.style.marginTop = '20vh';  // Add top margin to avoid overlap with the grid
      serviceSection.style.position = 'relative';
      serviceSection.style.zIndex = '10'; // Bring service section above grid
    }
  }

  // Reset buttons and circles to their default state
  function resetButtonsAndCircles() {
    serviceButtons.forEach(btn => {
      btn.style.width = '100%';
      btn.style.backgroundColor = 'transparent';
      btn.style.color = 'initial';
      btn.style.marginLeft = '0';
    });

    buttonCircles.forEach(circle => {
      circle.style.backgroundColor = 'transparent';
      circle.style.transform = 'translateX(0px)';
      circle.dataset.selected = 'false';
    });
  }

  // Highlight the circle on hover (desktop only)
  function highlightCircle(index) {
    if (buttonCircles[index] && buttonCircles[index].dataset.selected !== 'true') {
      buttonCircles[index].style.backgroundColor = '#1e1e1e';
    }
  }

  // Reset circle on hover out (desktop only)
  function resetCircle(index) {
    if (buttonCircles[index] && buttonCircles[index].dataset.selected !== 'true') {
      buttonCircles[index].style.backgroundColor = 'transparent';
    }
  }

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
