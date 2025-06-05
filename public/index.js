const sources = ['fresh.png','chill.jpg']
//rotation code
let openimg = 0
function rotatepic() {
    let imageelement = document.getElementById('img1')//grab the image element
    imageelement.src = sources[openimg];//actually set the image
    openimg++//increase the iterator
    if(openimg>sources.length-1)openimg=0;//double check for out of bounds exceptions
} 
//and rotate!
rotatepic()
setInterval(rotatepic, 5000)

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('column-animation');
      }
    });
  });

  observer.observe(document.querySelector('.c1'));
  observer.observe(document.querySelector('.c2'));
  observer.observe(document.querySelector('.c3'));
  observer.observe(document.querySelector('.c4'));



