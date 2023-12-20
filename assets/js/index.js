/**
 * contains client-side JavaScript function
 *  (primarily event handlers to fetch data from the Node server)
 */

const textbox = document.querySelector("input.homFilter");

textbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.location = `/?filter=${textbox.value}`;
  }
});
