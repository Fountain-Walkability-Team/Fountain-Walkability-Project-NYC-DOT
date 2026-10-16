// Footer year
document.querySelectorAll(".current-year").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

/*
 * MAP API INTEGRATION (pages/index.html only):
 * Load your map provider's SDK in pages/index.html, then initialize it here
 * and render it into the empty #fountain-map element.
 */
