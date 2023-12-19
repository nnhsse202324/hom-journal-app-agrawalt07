/**
 * contains client-side JavaScript function
 *  (primarily event handlers to fetch data from the Node server)
 */

const dropdown = document.getElementById("filter");

dropdown.addEventListener("change", () => {
  window.location = `/?hom=${dropdown.value}`;
});
