const QUOTES = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A picture is worth a thousand words.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Success usually comes to those who are too busy to be looking for it.",
    "The best way to predict your future is to create it."
];

let currentQuote = "";
let currentLetterIndex = 0;
let timer;
let timeLeft = 30;
let lettersTyped = 0;
let correctLetters = 0;
let totalLetters = 0;
let started = false;
let previousTestStats = null;
let previousQuote = "";

document.addEventListener("DOMContentLoaded", () => {
    const mainMenu = document.getElementById("main-menu");
    const gamemodesMenu = document.getElementById("gamemodes-menu");
    const typingTest = document.getElementById("typing-test");
    const resultsMenu = document.getElementById("results-menu");
    const startButton = document.getElementById("start-test");
    const resetButton = document.getElementById("reset-test");
    const backButton = document.getElementById("back-menu");
    const backButtonResults = document.getElementById("back-menu-results");
    const retakeSameButton = document.getElementById("retake-same");
    const retakeNewButton = document.getElementById("retake-new");
    const quoteElement = document.getElementById("quote");
    const inputElement = document.getElementById("input");
    const timeElement = document.getElementById("time");
    const wpmElement = document.getElementById("wpm");
    const accuracyElement = document.getElementById("accuracy");
    const previousResultsElement = document.getElementById("previous-results");
    const resultsWPMElement = document.getElementById("results-wpm");
    const resultsAccuracyElement = document.getElementById("results-accuracy");
    const leaderboardButton = document.getElementById("leaderboard");
    const statsButton = document.getElementById("stats");
    const backToMainButton = document.getElementById("back-to-main");

    if (!startButton || !resetButton || !backButton || !backButtonResults || !retakeSameButton || !retakeNewButton || !quoteElement || !inputElement || !timeElement || !wpmElement || !accuracyElement || !previousResultsElement || !resultsWPMElement || !resultsAccuracyElement || !leaderboardButton || !statsButton || !backToMainButton) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }

    startButton.addEventListener("click", () => {
        mainMenu.style.display = "none";
        gamemodesMenu.style.display = "block";
    });

    const singleQuoteButton = document.getElementById("single-quote");
    if (singleQuoteButton) {
        singleQuoteButton.addEventListener("click", () => {
            gamemodesMenu.style.display = "none";
            typingTest.style.display = "block";
            startTest();
        });
    } else {
        console.error("Element with ID 'single-quote' not found.");
    }

    backButton.addEventListener("click", () => {
        typingTest.style.display = "none";
        resultsMenu.style.display = "none";
        gamemodesMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    backButtonResults.addEventListener("click", () => {
        resultsMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    retakeSameButton.addEventListener("click", () => {
        typingTest.style.display = "block";
        resultsMenu.style.display = "none";
        startTest(true);
    });

    retakeNewButton.addEventListener("click", () => {
        typingTest.style.display = "block";
        resultsMenu.style.display = "none";
        startTest(false);
    });

    resetButton.addEventListener("click", () => {
        resetTest();
    });

    leaderboardButton.addEventListener("click", () => {
        alert('Leaderboard feature is not yet implemented.');
        // Placeholder for leaderboard functionality
    });

    statsButton.addEventListener("click", () => {
        alert('Stats feature is not yet implemented.');
        // Placeholder for stats functionality
    });

    backToMainButton.addEventListener("click", () => {
        gamemodesMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    function startTest(isRetakeSame = false) {
        if (isRetakeSame) {
            currentQuote = previousQuote;
        } else {
            do {
                currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            } while (currentQuote === previousQuote);
        }

        previousQuote = currentQuote;
        quoteElement.innerHTML = currentQuote.split('').map(char => `<span>${char}</span>`).join('');
        inputElement.value = "";
        inputElement.disabled = false;
        inputElement.focus();
        lettersTyped = 0;
        correctLetters = 0;
        totalLetters = 0;
        currentLetterIndex = 0;
        timeLeft = 30;
        timeElement.textContent = timeLeft;
        wpmElement.textContent = "0.00";
        accuracyElement.textContent = "100.00";
        started = false;
        clearInterval(timer);
        highlightCurrentLetter();
    }

    function resetTest() {
        clearInterval(timer);
        startTest(false);
    }

    function updateTime() {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.textContent = timeLeft;
            updateStats();
        } else {
            endTest();
        }
    }

    function highlightCurrentLetter() {
        const letterElements = quoteElement.querySelectorAll('span');
        letterElements.forEach((element, index) => {
            element.classList.remove('current');
            if (index === currentLetterIndex) {
                element.classList.add('current');
            }
        });
    }

    function checkLetter() {
        const letterElements = quoteElement.querySelectorAll('span');
        const currentInput = inputElement.value;

        if (!started) {
            started = true;
            timer = setInterval(updateTime, 1000);
        }

        if (currentInput.length > 0 && currentInput[currentLetterIndex] === letterElements[currentLetterIndex].textContent) {
            // Correct letter
            letterElements[currentLetterIndex].classList.add('correct');
            letterElements[currentLetterIndex].classList.remove('incorrect');
            correctLetters++;
            currentLetterIndex++;
            if (currentLetterIndex === letterElements.length) {
                endTest();
            } else {
                highlightCurrentLetter();
            }
        } else if (currentInput.length === 0 && currentLetterIndex > 0) {
            // Handle backspace
            letterElements[currentLetterIndex].classList.remove('correct');
            letterElements[currentLetterIndex].classList.remove('incorrect');
            currentLetterIndex--;
            highlightCurrentLetter();
        } else if (currentInput.length > 0) {
            // Incorrect letter
            letterElements[currentLetterIndex].classList.add('incorrect');
            letterElements[currentLetterIndex].classList.remove('correct');
        }

        // Handle letter counting for WPM and accuracy
        if (currentInput.length > 0 && currentLetterIndex <= letterElements.length - 1) {
            lettersTyped++;
            totalLetters = letterElements.length;
            updateStats();
        }
    }

    function updateStats() {
        const elapsedTime = Math.max(30 - timeLeft, 1); 
        const wpm = (correctLetters / 5) / (elapsedTime / 60); 
        wpmElement.textContent = (Math.round(wpm * 100) / 100).toFixed(2);

        const errors = lettersTyped - correctLetters;
        const accuracy = (lettersTyped === 0) ? 100 : ((lettersTyped - errors) / lettersTyped) * 100;
        accuracyElement.textContent = (Math.max(0, accuracy)).toFixed(2); 
    }

    function endTest() {
        clearInterval(timer);
        inputElement.disabled = true;
        showResults();
    }

    function showResults() {
        resultsWPMElement.textContent = wpmElement.textContent;
        resultsAccuracyElement.textContent = accuracyElement.textContent;

        const currentTestStats = {
            wpm: resultsWPMElement.textContent,
            accuracy: resultsAccuracyElement.textContent
        };

        if (previousTestStats) {
            previousResultsElement.innerHTML = `
                <h3>Previous Test</h3>
                <p>WPM: ${previousTestStats.wpm}</p>
                <p>Accuracy: ${previousTestStats.accuracy}%</p>
            `;
        } else {
            previousResultsElement.innerHTML = "";
        }

        previousTestStats = currentTestStats;
        typingTest.style.display = "none";
        resultsMenu.style.display = "block";
    }

    inputElement.addEventListener('input', checkLetter);
});
