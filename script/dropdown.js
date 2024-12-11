document.addEventListener('DOMContentLoaded', function () {
  // Dropdown menu elements
  const iconMobile = document.getElementById('icon_mobile');
  const navbox = document.getElementById('navbox');
  const iconImage = iconMobile.querySelector('img'); // The image inside #icon_mobile

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
});
