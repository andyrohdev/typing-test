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
let wordsTyped = 0;
let correctWords = 0;
let totalWords = 0;
let started = false;
let previousTestStats = null;
let previousQuote = "";

document.addEventListener("DOMContentLoaded", () => {
    const mainMenu = document.getElementById("main-menu");
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

    // Event listener for start button
    startButton.addEventListener("click", () => {
        mainMenu.style.display = "none";
        typingTest.style.display = "block";
        startTest();
    });

    // Event listener for back button
    backButton.addEventListener("click", () => {
        typingTest.style.display = "none";
        resultsMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    // Event listener for back button on results page
    backButtonResults.addEventListener("click", () => {
        resultsMenu.style.display = "none";
        mainMenu.style.display = "block";
    });

    // Event listener for retake same test button
    retakeSameButton.addEventListener("click", () => {
        typingTest.style.display = "block";
        resultsMenu.style.display = "none";
        startTest(true);
    });

    // Event listener for retake new test button
    retakeNewButton.addEventListener("click", () => {
        typingTest.style.display = "block";
        resultsMenu.style.display = "none";
        startTest(false);
    });

    // Event listener for reset button
    resetButton.addEventListener("click", () => {
        resetTest();
    });

    // Start test function
    function startTest(isRetakeSame = false) {
        if (isRetakeSame) {
            // Ensure the new quote is not the same as the previous one
            currentQuote = previousQuote;
        } else {
            // Ensure the new quote is not the same as the previous one
            do {
                currentQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            } while (currentQuote === previousQuote);
        }

        previousQuote = currentQuote; // Store the current quote
        quoteElement.innerHTML = currentQuote.split(' ').map(word => `<span>${word}</span>`).join(' ');
        inputElement.value = "";
        inputElement.disabled = false;
        inputElement.focus();
        wordsTyped = 0;
        correctWords = 0;
        totalWords = 0;
        currentWordIndex = 0;
        timeLeft = 30;
        timeElement.textContent = timeLeft;
        wpmElement.textContent = 0;
        accuracyElement.textContent = 100;
        started = false;
        clearInterval(timer);
        highlightCurrentWord();
    }

    // Reset test function
    function resetTest() {
        clearInterval(timer);
        startTest(false);
    }

    // Update time function
    function updateTime() {
        if (timeLeft > 0) {
            timeLeft--;
            timeElement.textContent = timeLeft;
            updateStats();
        } else {
            endTest();
        }
    }

    // Highlight current word function
    function highlightCurrentWord() {
        const wordElements = quoteElement.querySelectorAll('span');
        wordElements.forEach((element, index) => {
            element.classList.remove('current');
            if (index === currentWordIndex) {
                element.classList.add('current');
            }
        });
    }

    // Check word function
    function checkWord() {
        const wordElements = quoteElement.querySelectorAll('span');
        const currentInput = inputElement.value;
        const currentWord = wordElements[currentWordIndex].textContent;

        totalWords = wordElements.length;

        if (!started) {
            started = true;
            timer = setInterval(updateTime, 1000);
        }

        if (currentInput.trim() === currentWord) {
            wordElements[currentWordIndex].classList.add('correct');
            wordElements[currentWordIndex].classList.remove('incorrect');
        } else {
            wordElements[currentWordIndex].classList.add('incorrect');
            wordElements[currentWordIndex].classList.remove('correct');
        }

        if (currentInput.endsWith(' ')) {
            if (currentInput.trim() === currentWord) {
                correctWords++;
                currentWordIndex++;
                inputElement.value = "";
                highlightCurrentWord();
                if (currentWordIndex === wordElements.length) {
                    endTest();
                }
            }
            wordsTyped++;
        }
    }

    // Update stats function
    function updateStats() {
        const elapsedTime = Math.max(30 - timeLeft, 1); // Ensure at least 1 second to avoid division by zero
        const wpm = (wordsTyped / (elapsedTime / 60));
        wpmElement.textContent = Math.round(wpm);

        const errors = totalWords - correctWords;
        const accuracy = (wordsTyped === 0) ? 100 : ((wordsTyped - errors) / wordsTyped) * 100;
        accuracyElement.textContent = Math.max(0, Math.round(accuracy)); // Ensure accuracy doesn't go below 0
        
        
    }

    // End test function
    function endTest() {
        clearInterval(timer);
        inputElement.disabled = true;
        showResults();
    }

    // Show results function
    function showResults() {
        resultsWPMElement.textContent = wpmElement.textContent;
        resultsAccuracyElement.textContent = accuracyElement.textContent;

        // Store current test stats
        const currentTestStats = {
            wpm: resultsWPMElement.textContent,
            accuracy: resultsAccuracyElement.textContent
        };

        // If there are previous stats, display them
        if (previousTestStats) {
            previousResultsElement.innerHTML = `
                <h3>Previous Test</h3>
                <p>WPM: ${previousTestStats.wpm}</p>
                <p>Accuracy: ${previousTestStats.accuracy}%</p>
            `;
        } else {
            previousResultsElement.innerHTML = ""; // Clear if no previous stats
        }

        // Update previousTestStats to current test stats
        previousTestStats = currentTestStats;

        typingTest.style.display = "none";
        resultsMenu.style.display = "block";
    }

    inputElement.addEventListener('input', checkWord);

    // Add event listener for Enter key
    inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter key action (e.g., form submission)
            endTest();
        }

        if (!started && event.key === 'Enter') {
            accuracyElement.textContent = 0;
            endTest();
        }


    });
});
