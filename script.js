// ==========================================
// MIND CLASH
// CORE PLAYER SYSTEM
// ==========================================


// ==========================================
// PLAYER DATA
// ==========================================

let player = {
    name: "",
    strand: "",
    points: 0,
    wins: 0,
    losses: 0,
    allStrandUnlocked: false
};


// ==========================================
// STRAND LIST
// ==========================================

const strands = [
    "ABM",
    "STEM",
    "HUMSS",
    "GAS",
    "TVL"
];


// ==========================================
// CHECK ALL-STRAND UNLOCK
// ==========================================

function checkAllStrandUnlock() {

    if (player.points >= 100) {
        player.allStrandUnlocked = true;
    } else {
        player.allStrandUnlocked = false;
    }

}


// ==========================================
// SAVE PLAYER
// ==========================================

function savePlayer() {

    checkAllStrandUnlock();

    localStorage.setItem(
        "mindClashPlayer",
        JSON.stringify(player)
    );

}


// ==========================================
// LOAD PLAYER
// ==========================================

function loadPlayer() {

    const savedPlayer =
        localStorage.getItem("mindClashPlayer");

    if (savedPlayer) {

        player = JSON.parse(savedPlayer);

        checkAllStrandUnlock();

    }

}


// ==========================================
// START GAME
// ==========================================

function startGame() {

    const gamesSection =
        document.getElementById("games");

    if (gamesSection) {

        gamesSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ==========================================
// STRAND BATTLE
// ==========================================

function openStrandBattle() {

    loadPlayer();

    if (!player.name || !player.strand) {

        const name =
            prompt("Enter your player name:");

        if (!name || name.trim() === "") {
            return;
        }

        player.name = name.trim();


        const strand =
            prompt(
                "Choose your strand:\n\n" +
                "ABM\n" +
                "STEM\n" +
                "HUMSS\n" +
                "GAS\n" +
                "TVL"
            );

        if (!strand) {
            return;
        }

        const selectedStrand =
            strand.trim().toUpperCase();


        if (!strands.includes(selectedStrand)) {

            alert(
                "Invalid strand.\n\n" +
                "Please choose ABM, STEM, HUMSS, GAS, or TVL."
            );

            return;
        }


        player.strand = selectedStrand;

        savePlayer();

    }


    alert(
        "Welcome, " +
        player.name +
        "!\n\n" +
        "Your Strand: " +
        player.strand +
        "\n\n" +
        "Strand Battle will be added next."
    );

}


// ==========================================
// ALL-STRAND BATTLE
// ==========================================

function openAllStrand() {

    loadPlayer();

    checkAllStrandUnlock();


    if (!player.allStrandUnlocked) {

        const remaining =
            100 - player.points;

        alert(
            "ALL-STRAND BATTLE IS LOCKED.\n\n" +
            "You need 100 points to unlock it.\n\n" +
            "Current Points: " +
            player.points +
            "\n" +
            "Points Needed: " +
            remaining
        );

        return;
    }


    alert(
        "ALL-STRAND BATTLE UNLOCKED!\n\n" +
        "Players from different strands can battle here.\n\n" +
        "Win Reward: +50 Points"
    );

}


// ==========================================
// ADD STRAND BATTLE WIN
// ==========================================

function addStrandWin() {

    player.points += 10;

    player.wins++;

    checkAllStrandUnlock();

    savePlayer();

}


// ==========================================
// ADD ALL-STRAND WIN
// ==========================================

function addAllStrandWin() {

    player.points += 50;

    player.wins++;

    checkAllStrandUnlock();

    savePlayer();

}


// ==========================================
// ADD LOSS
// ==========================================

function addLoss() {

    player.losses++;

    savePlayer();

}


// ==========================================
// PROFILE DISPLAY
// ==========================================

function updateProfile() {

    loadPlayer();

    const profileBox =
        document.querySelector(".profile-box");

    if (!profileBox) {
        return;
    }


    const unlockStatus =
        player.allStrandUnlocked
            ? "UNLOCKED"
            : "LOCKED";


    profileBox.innerHTML = `

        <div class="profile-icon">
            👤
        </div>

        <h3>
            ${player.name || "Player"}
        </h3>

        <p>
            Strand:
            ${player.strand || "Not selected"}
        </p>

        <p>
            Points:
            ${player.points}
        </p>

        <p>
            Wins:
            ${player.wins}
        </p>

        <p>
            Losses:
            ${player.losses}
        </p>

        <p>
            All-Strand:
            ${unlockStatus}
        </p>

    `;

}


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPlayer();

        updateProfile();

    }
);


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add("active");

                }

            }
        );

    }
);
