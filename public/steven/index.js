setTimeout(() => {
  console.log("Deleting Wix"); // This runs after 2000 milliseconds
}, 2000);
document.addEventListener('DOMContentLoaded', (event) => {
  // Get a reference to the div element by its ID
  const element = document.getElementById('WIX_ADS');

  if (element) {
    // Remove the element
    element.remove()
  }
});
