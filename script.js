const ENCHANTS = [
    "Aqua Affinity",
    "Bane of Arthropods",
    "Blast Protection",
    "Channeling",
    "Curse of Binding",
    "Curse of Vanishing",
    "Depth Strider",
    "Efficiency",
    "Feather Falling",
    "Fire Aspect",
    "Fire Protection",
    "Flame",
    "Fortune",
    "Frost Walker",
    "Impaling",
    "Infinity",
    "Knockback",
    "Looting",
    "Loyalty",
    "Luck of the Sea",
    "Lure",
    "Mending",
    "Multishot",
    "Piercing",
    "Power",
    "Projectile Protection",
    "Protection",
    "Punch",
    "Quick Charge",
    "Respiration",
    "Riptide",
    "Sharpness",
    "Silk Touch",
    "Smite",
    "Soul Speed",
    "Sweeping Edge",
    "Thorns",
    "Unbreaking",
];

const notifEl = document.getElementById("notification");
const roundNumEl = document.getElementById("round-num");
const runeDisplay = document.getElementById("rune-display");
const selectEl = document.getElementById("enchant-select");
const guessBtn = document.getElementById("guess-btn");
const resultsCon = document.getElementById("results-container");
const totalScoreEl = document.getElementById("total-score");
const scoreTableBod = document.querySelector("#score-table tbody");
const playAgainBtn = document.getElementById("play-again-btn");
const gameCon = document.getElementById("game-container");

let rounds, currentRound, totalScore;

function showNotif(msg) {
    notifEl.textContent = msg;
    notifEl.style.opacity = "1";
    setTimeout(() => (notifEl.style.opacity = "0"), 1000);
}

function renderRunes(text) {
    runeDisplay.innerHTML = "";

    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = text.length * size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    text.toUpperCase()
        .split("")
        .forEach((ch, i) => {
            if (/[A-Z]/.test(ch)) {
                const img = new Image();
                img.src = `symbols/${ch}.png`;
                img.onload = () => {
                    ctx.drawImage(img, i * size, 0, size, size);
                };
            }
        });

    runeDisplay.appendChild(canvas);
}

function initSelect() {
    selectEl.innerHTML = '<option value="">Not selected</option>';
    ENCHANTS.forEach(e => {
        const opt = document.createElement("option");
        opt.value = e;
        opt.textContent = e;
        selectEl.appendChild(opt);
    });
}

function nextRound() {
    if (currentRound >= 5) return endGame();
    currentRound++;
    roundNumEl.textContent = currentRound;
    attemptsLeft = 5;
    pointsThisRound = 5000;
    selectEl.value = "";
    renderRunes(rounds[currentRound - 1]);
}

let attemptsLeft, pointsThisRound;
guessBtn.addEventListener("click", () => {
    const choice = selectEl.value;
    if (!choice) return;
    const correct = rounds[currentRound - 1];
    if (choice === correct) {
        totalScore += pointsThisRound;
        scoreTableBod.innerHTML += `
      <tr><td>${currentRound}</td><td>${pointsThisRound}</td></tr>
    `;
        nextRound();
    } else {
        attemptsLeft--;
        pointsThisRound -= 1000;
        showNotif(`Wrong! ${attemptsLeft} attempts left.`);
        if (attemptsLeft === 0) {
            scoreTableBod.innerHTML += `
        <tr><td>${currentRound}</td><td>0</td></tr>
      `;
            nextRound();
        }
    }
});

function endGame() {
    gameCon.classList.add("hidden");
    totalScoreEl.textContent = totalScore;
    resultsCon.classList.remove("hidden");
}

playAgainBtn.addEventListener("click", startGame);

function startGame() {
    rounds = [...ENCHANTS].sort(() => 0.5 - Math.random()).slice(0, 5);
    currentRound = 0;
    totalScore = 0;
    scoreTableBod.innerHTML = "";
    resultsCon.classList.add("hidden");
    gameCon.classList.remove("hidden");
    initSelect();
    nextRound();
}

startGame();
