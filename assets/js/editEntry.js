const submitButton = document.querySelector("input.submit");
const deleteButton = document.querySelector("input.delete");

submitButton.addEventListener("click", async () => {
  const date = document.querySelector("input.date").value;
  const habitOfMindButtons = document.querySelectorAll("input.habits:checked");
  const habitOfMind =
    habitOfMindButtons.length > 0 ? habitOfMindButtons[0].value : null;
  const content = document.querySelector("textarea.content").value;

  const id = document.getElementById("entryID").dataset.id;

  const newEntry = { date, habit: habitOfMind, content };

  const response = await fetch("/editEntry/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEntry),
  });

  if (response.ok) {
    window.location = "/";
  } else {
    console.log("Error editing entry");
  }
});

deleteButton.addEventListener("click", async () => {
  const id = document.getElementById("entryID").dataset.id;

  const response = await fetch("/deleteEntry/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location = "/";
  } else {
    console.log("Error deleting entry");
  }
});
