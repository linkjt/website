const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('right');
      }
    });
  });
  const eyes = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('enlarge');
      }
    });
  });

  observer.observe(document.getElementById('1'));
  eyes.observe(document.getElementById('4'));
 observer.observe(document.getElementById('2'));
  eyes.observe(document.getElementById('5'));
  observer.observe(document.getElementById('3'));
  eyes.observe(document.getElementById('6'));



  