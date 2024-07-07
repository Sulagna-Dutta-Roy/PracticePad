document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.querySelector("#dark-mode-toggle");
  const darkModeIcon = document.querySelector("#dark-mode-icon");

  darkModeToggle.addEventListener("click", function () {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // Toggle icon class
    if (body.classList.contains("dark-mode")) {
      darkModeIcon.classList.remove("ri-moon-line");
      darkModeIcon.classList.add("ri-sun-line");
    } else {
      darkModeIcon.classList.remove("ri-sun-line");
      darkModeIcon.classList.add("ri-moon-line");
    }

    // Save user preference in localStorage
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDarkMode);
  });

  // Check localStorage for user preference
  const savedDarkMode = localStorage.getItem("dark-mode");
  if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
    darkModeIcon.classList.remove("ri-moon-line");
    darkModeIcon.classList.add("ri-sun-line");
  }
});
