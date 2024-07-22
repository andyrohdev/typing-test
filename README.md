# typingtest-project

# Introduction
This is a **Typing Test Single Web Page Application**.
This is a passion side project using my knowledge and experience I gained from self study, Tech Elevator, and AI for generative content.
If you have any questions, please reach out to me at, 
email: rohjamesandy
LinkedIn: andyrohdev
### User Stories: **(UPDATED)**
1. Login and Register Page
2. Main Menu which has multiple choices.
		1. Play
			1. 3 Game Modes
				1. Standard One Quote **DONE**
					1. This game mode tests how fast you can type ONE quote.
				2. Timed Chained Quotes
					1. This game mode chains multiple quotes and test your ability on how far you can get within the time limit. (30 seconds)
				3. Words
					1. This game mode only gives words. Test how many words you can get within the time limit.
					2. There will be 5 words max displayed at a time.
					3. 2 previous words that the user typed
					4. And 2 words that are up and coming.
					5. The two words on either side of the current word are greyed out.
					6. This test has a unique mechanic called COMBOS
						1. The combo will go up for how many words you get correct in a row.
						2. The score calculation will be different for this game mode.
						3. The combo dictates the score multiplier of the points you earn with a certain combo.
							1. 0 correct words has a 1x multiplier. Unlimited time.
						    2. 3 correct words in a row has a 2x multiplier. 5 second window.
						    3. 7 correct words in a row has a 3x multiplier. 3 second window.
						    4. 15 correct words in a row has a 4x multiplier. 2 second window.
						    5. 25 correct words in a row has a MAX (5x multiplier) 1 second window.
						    6. The multiplier system rewards points based on the multiplication number.
						    7. Combo breaks when a user spells a word wrong OR when they take too long.
		2. View Stats
			1. User's average WPM, accuracy, best WPM, and specific test scores.
			2. The user can select a test to view specific stats.
		3. Leaderboard
			1. Has multiple users all displayed in order of their WPM and Accuracy Calculation.




# Use Cases: **(OLD)**
1. As a user of the system I need to be able to access a main menu.
2. As a user, I need to be able to register and login.
    1. A user has a username, password, date_created, and **level**.
3. Choose to start a new test.
    1. Easy
    2. Medium
    3. Hard
4. Choose to exit the game.
5. Choose to view stats of a certain test and stats of a test.
    1. A test has a id, 
    2. You can view your total mistakes of a test
    3. You can view your words per minutes of a test.
6. A test can take in a user's input/word and compare it to the quotes word.
    1. Case sensitive
    2. Can find the error on the LETTER. Not at the end of the word.
7. A test has a time limit.
    1. Easy has 15 seconds.
    2. Medium has 20 seconds.
    3. Hard has 30 seconds.
8. A test has a combo system.
    1. 0 correct words has a 1x multiplier. Unlimited time.
    2. 3 correct words in a row has a 2x multiplier. 5 second window.
    3. 7 correct words in a row has a 3x multiplier. 3 second window.
    4. 15 correct words in a row has a 4x multiplier. 2 second window.
    5. 25 correct words in a row has a MAXx (5x multiplier) 1 second window.
    6. The multiplier system rewards points based on the multiplication number.
    7. Combo breaks when a user spells a word wrong OR when they take too long.
9. A test has a time bonus system
    1. The faster someone completes a test the more they earn bonus points.
    2. If they finish with 4/5 time left, they earn a 15% BONUS of their final point calculation. 3/5 they will earn 10% BONUS. 1/5 is 5% BONUS. Anything under is no bonus points.
10. Once the timer is done or the user finished their test, a end menu is displayed.
    1. They can view details of their test here.
    2. They can also return back to the main menu.
11. OPTIONAL: Instead of quotes, use action words to dictate the action in a story game.
12. Leaderboard
    1. A user can view a leaderboard that has a database's scores.
    2. They are sorted based on 3 filters.
        1. Easy
        2. Medium
        3. Hard
    3. The scores are ordered from Highest Score for each difficulty.

# Brainstorming Design

Typing test word design

I REALLY WANT TO ADD A COMBO SYSTEM LIKE A RHYTHM GAME! THAT WOULD BE COOL
Combo breaks when you make a spelling mistake or take too long, the timer window gets smaller the higher your combo, caps at a limit (Don’t want to make it impossible)
Maybe make it like a story game like progression and add a endless mode as optional game mode for score breaking / record setting.

File reader reads from database popular quotes that the user will type.

Text object
	Length
	Should it be the files nextline?
	

Timer object

Application will show the user some choices.
	These choices will help the user decide what kind of test they want to do.

First UI.

Start typing test
		Easy
		All lowercase, no proper punctuation
		Medium
		Some punctuation, easy words
		Hard
		Harder quotes that might be long or have some complexity.
Settings
		Some kind of customizable settings
Statistics / Stats
Exit

Typing test rpg,
Quick time event

Actions should be typed out under of timer.
Actions should be sentence based
Use ai to define flexibility,

Limit action words. 


