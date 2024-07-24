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
let currentWordIndex = 0;
let timer;
let timeLeft = 30;
let lettersTyped = 0;
let correctLetters = 0;
let totalLetters = 0;
let started = false;
let previousQuote = "";

document.addEventListener("DOMContentLoaded", () => {
    const mainMenu = document.getElementById("main-menu");
    const themesMenu = document.getElementById("themes-menu");
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
    const themesButton = document.getElementById("themes-button");
    const backToMainFromThemesButton = document.getElementById("back-to-main-from-themes");
    const defaultButton = document.getElementById("default-button");
    const polarNightButton = document.getElementById("polar-night-button");

    if (!startButton || !resetButton || !backButton || !backButtonResults || !retakeSameButton || !retakeNewButton || !quoteElement || !inputElement || !timeElement || !wpmElement || !accuracyElement || !previousResultsElement || !resultsWPMElement || !resultsAccuracyElement || !leaderboardButton || !statsButton || !backToMainButton || !themesButton || !polarNightButton || !backToMainFromThemesButton) {
        console.error("One or more required elements are missing from the DOM.");
        return;
    }

    defaultButton.addEventListener("click", () => {
        document.body.classList.add('default-theme');
        document.body.classList.remove('polar-night-theme');
        themesMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    polarNightButton.addEventListener("click", () => {
        document.body.classList.add('polar-night-theme');
        document.body.classList.remove('default-theme');
        themesMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

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

    themesButton.addEventListener("click", () => {
        mainMenu.style.display = "none";
        themesMenu.style.display = "block";
    });

    backToMainFromThemesButton.addEventListener("click", () => {
        themesMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    function startTest(isRetakeSame = false) {
        if (isRetakeSame && previousQuote) {
            currentQuote = previousQuote;
        } else {
            do {
                currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            } while (currentQuote === previousQuote);
        }
    
        previousQuote = currentQuote;
        quoteElement.innerHTML = currentQuote.split(' ').map(word => `<span>${word}</span>`).join(' ');
        inputElement.value = "";
        inputElement.disabled = false;
        inputElement.focus();
        lettersTyped = 0;
        correctLetters = 0;
        totalLetters = currentQuote.replace(/ /g, '').length;
        currentWordIndex = 0;
        timeLeft = 30;
        timeElement.textContent = timeLeft;
        wpmElement.textContent = "0.00";
        accuracyElement.textContent = "100.00";
        started = false;
        clearInterval(timer);
        highlightCurrentWord();

        // Clear previous results section
        previousResultsElement.innerHTML = '';
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

    function highlightCurrentWord() {
        const wordElements = quoteElement.querySelectorAll('span');
        wordElements.forEach((element, index) => {
            element.classList.remove('current');
            if (index === currentWordIndex) {
                element.classList.add('current');
            }
        });
    }

    function checkWord() {
        const wordElements = quoteElement.querySelectorAll('span');
        const currentInput = inputElement.value;

        if (!started) {
            started = true;
            timer = setInterval(updateTime, 1000);
        }

        const currentWord = wordElements[currentWordIndex].textContent.trim();
        const isLastWord = currentWordIndex === wordElements.length - 1;

        if (currentInput.endsWith(' ')) {
            if (currentInput.trim() === currentWord) {
                // Correct word followed by space
                wordElements[currentWordIndex].classList.add('correct');
                wordElements[currentWordIndex].classList.remove('incorrect');
                correctLetters += currentInput.trim().length;
                lettersTyped += currentInput.trim().length;
                currentWordIndex++;
                inputElement.value = "";

                if (currentWordIndex === wordElements.length) {
                    endTest(); // End the test if it's the last word
                } else {
                    highlightCurrentWord();
                }
            } else {
                // Incorrect word followed by space
                wordElements[currentWordIndex].classList.add('incorrect');
                wordElements[currentWordIndex].classList.remove('correct');
                lettersTyped += currentInput.trim().length;
                inputElement.value = "";
            }
        } else if (isLastWord && currentInput.trim() === currentWord) {
            // Last word typed correctly without space
            wordElements[currentWordIndex].classList.add('correct');
            wordElements[currentWordIndex].classList.remove('incorrect');
            correctLetters += currentInput.trim().length;
            lettersTyped += currentInput.trim().length;
            inputElement.value = "";
            endTest(); // End the test immediately since it's the last word
        }

        updateStats();
    }

    function updateStats() {
        const elapsedTime = Math.max(30 - timeLeft, 1);
        const wpm = (lettersTyped / 5) / (elapsedTime / 60);
        wpmElement.textContent = (Math.round(wpm * 100) / 100).toFixed(2);

        const errors = lettersTyped - correctLetters;
        const accuracy = (lettersTyped === 0) ? 100 : (correctLetters / lettersTyped) * 100;
        accuracyElement.textContent = (Math.round(accuracy * 100) / 100).toFixed(2);
    }

    function endTest() {
        clearInterval(timer);
        inputElement.disabled = true;
        resultsWPMElement.textContent = wpmElement.textContent;
        resultsAccuracyElement.textContent = accuracyElement.textContent;
    
        console.log('Current Test Results:', {
            wpm: resultsWPMElement.textContent,
            accuracy: resultsAccuracyElement.textContent
        });
    
        // Update previous test stats with the current test stats after the test ends
        previousTestStats = {
            wpm: resultsWPMElement.textContent,
            accuracy: resultsAccuracyElement.textContent
        };
    
        console.log("Updated PreviousTest, ", previousTestStats);
    
        // Do not display previous results on the results page
        previousResultsElement.innerHTML = '';

        typingTest.style.display = "none";
        resultsMenu.style.display = "block";
    }

    inputElement.addEventListener("input", checkWord);
});
