document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('toggleMenu');
  const menu = document.getElementById('menuListMobile');

  hamburger.addEventListener('click', () => {
    toggleMenu.classList.toggle('hamburger-toggle');
    if (menu.classList.contains('hidden')) {
      // Remove hidden class
      menu.classList.remove('hidden');
      
      // Set initial height to 0 to start the animation
      menu.style.height = '0px';

      // Allow the browser to calculate the scroll height (full height of the menu)
      const fullHeight = menu.scrollHeight + 18 + 'px';

      // Set the height dynamically for smooth animation
      setTimeout(() => {
        menu.style.height = fullHeight;
      }, 10); // Timeout ensures that the height change is rendered

    } else {
      // Set the height to its current scrollHeight (full size) before collapsing
      menu.style.height = menu.scrollHeight + 'px';

      // Force a reflow so the height is set before collapsing
      setTimeout(() => {
        menu.style.height = '0px';
      }, 10);

      // Hide the menu after the transition ends
      setTimeout(() => {
        menu.classList.add('hidden');
      }, 300); // Match this timeout with the CSS transition duration
    }
  });
});
