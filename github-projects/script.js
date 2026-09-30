console.log("Yuvaraj S - Web Interface Projects loaded successfully.");

const projectLinks = document.querySelectorAll(".project-card a");

projectLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const projectName =
            link.closest(".project-card").querySelector("h3").textContent;

        console.log("Opening:", projectName);
    });
});