// =========================
// MIND CLASH
// MAIN SCRIPT
// =========================


// START CLASH
function startGame() {
    document.getElementById("games").scrollIntoView({
        behavior: "smooth"
    });
}


// STRAND BATTLE
function openStrandBattle() {
    alert("Strand Battle is coming soon!");
}


// ALL STRAND
function openAllStrand() {
    alert("You need 100 points to unlock All Strand Battle.");
}


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});
