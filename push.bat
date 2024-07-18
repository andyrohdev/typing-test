@echo off

:: Prompt user for commit message
set /p commit_msg="Enter commit message: "

:: Add all changes to staging area
git add .

:: Commit changes with the provided message
git commit -m "%commit_msg%"

:: Push changes to remote repository
git push

echo Changes committed and pushed successfully!
pause