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
    const portfolioButton = document.getElementById("portfolio-button");
    const githubButton = document.getElementById("github-button"); // New GitHub button

    const backToMainButton = document.getElementById("back-to-main");
    const themesButton = document.getElementById("themes-button");
    const backToMainFromThemesButton = document.getElementById("back-to-main-from-themes");
    const defaultButton = document.getElementById("default-button");
    const polarNightButton = document.getElementById("polar-night-button");
    const darkModeButton = document.getElementById("dark-mode-button");
    const highContrastButton = document.getElementById("high-contrast-button");
    const solarizedLightButton = document.getElementById("solarized-light-button");

    // Theme Selection Event Listeners
    defaultButton.addEventListener("click", () => {
        setTheme('default-theme');
    });

    polarNightButton.addEventListener("click", () => {
        setTheme('polar-night-theme');
    });

    darkModeButton.addEventListener("click", () => {
        setTheme('dark-mode');
    });

    highContrastButton.addEventListener("click", () => {
        setTheme('high-contrast');
    });

    solarizedLightButton.addEventListener("click", () => {
        setTheme('solarized-light');
    });

    // Function to handle theme changes
    function setTheme(theme) {
        document.body.classList.remove('default-theme', 'polar-night-theme', 'dark-mode', 'high-contrast', 'solarized-light');
        document.body.classList.add(theme);
        themesMenu.style.display = "none";
        mainMenu.style.display = "block";
    }

    // Redirect to Portfolio
    portfolioButton.addEventListener("click", () => {
        window.location.href = "https://andyrohdev.github.io/portfolio-website/";
    });

    // Redirect to GitHub Repo
    githubButton.addEventListener("click", () => {
        window.location.href = "https://github.com/andyrohdev/typingtest-project"; // New GitHub repo redirection
    });

    // Game functionality below

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

    // Track backspace as an error
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            lettersTyped++;  // Count as an error when backspace is pressed
            updateStats();   // Update stats to reflect the new accuracy
        }
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
                wordElements[currentWordIndex].classList.add('correct');
                wordElements[currentWordIndex].classList.remove('incorrect');
                correctLetters += currentInput.trim().length;
                lettersTyped += currentInput.trim().length;
                currentWordIndex++;
                inputElement.value = "";

                if (currentWordIndex === wordElements.length) {
                    endTest(); 
                } else {
                    highlightCurrentWord();
                }
            } else {
                wordElements[currentWordIndex].classList.add('incorrect');
                wordElements[currentWordIndex].classList.remove('correct');
                lettersTyped += currentInput.trim().length;
                inputElement.value = "";
            }
        } else if (isLastWord && currentInput.trim() === currentWord) {
            wordElements[currentWordIndex].classList.add('correct');
            wordElements[currentWordIndex].classList.remove('incorrect');
            correctLetters += currentInput.trim().length;
            lettersTyped += currentInput.trim().length;
            inputElement.value = "";
            endTest(); 
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

        // Clear previous results section
        previousResultsElement.innerHTML = '';

        typingTest.style.display = "none";
        resultsMenu.style.display = "block";
    }

    inputElement.addEventListener("input", checkWord);
});
