# Contributing

## Getting Started: Only Do Once ##
1. Go to our organization: https://github.com/phalanges3
2. Go to our project repository: https://github.com/phalanges3/indulge
3. Fork the indulge repository to your own Github account.
4. Clone the indulge repository from your Github account to your local machine.
  - git clone https://github.com/YOURGITHUBHANDLE/indulge
5. cd into cloned repo.
6. Add a remote upstream. 
  - git remote add central https://github.com/phalanges3/indulge
  - **central** is an alias for our Point Blank's central repository. You can name it anything you want. 
  - **upstream** is actually the most commonly used alias, but **central** makes more semantic sense for now.
  - Now we have an easy way to **pull** from our central repository to keep our local repository up-to-date.
7. Switch to the dev branch.
  - git checkout dev



  - ***IMPORTANT***: Never ever work on the master or dev branch! ***IMPORTANT***




## Process for Working on a New Feature ##
1. Develop on your new feature branch!
2. **Commit often.**
3. When you're done with the feature or want to pull down updated code:
  - git add .
  - git commit -m "[]..."
4. Switch to origin dev
  - git checkout dev
5. Pull from central dev
  - git pull --rebase central dev
  - git status
6. Merge current feature branch to origin dev
  - git merge feat/"FEATURENAME"
7. If conflicts, handle them
  - git status
8. If prompted, follow prompts in git
  - i.e. git rebase - - continue, git rebase - -skip
  - git status
9. After merge conflicts, add and commit
  - git add, git commit
  - git status
## If you wish to submit a PR
  - git push origin dev
  - git checkout feat/"FEATURENAME"
  - on personal github, submit a PR from dev to dev
10. You have two choices here: create a new feature branch or return to your previous branch to continue working.
  1a. Create a new branch:
   - git checkout -b feat/"FEATURENAME"
  1b. Return to previous branch
  - git checkout feat/"FEATURENAME"
  - git merge dev
  
## Commit Messages Format ##
1. Use the present tense for each commit.
2. Capitalize the first word of each commit.
3. Do not use periods to end a commit.
4. Prefix a keyword and space before each commit. 
4. **Be very, very clear and specific in your commit messages.**

### KEYWORDS: ###
- [progress] - progress on a specific feature has been made
- [feature] - implementation of a specific feature is complete
- [fix] - made something broken working, like a bug or something
- [style] - styling changes
- [refactor] - code does the same thing but it is better code
- [setup] - changes to readme, gitignore, package.json, webpack, scaffolding, backend routing, database config, etc.

### Examples: ###
- [progress] Make progress on itemform and wishlist rendering
- [feature] Finish basic signup component
- [fix] Fix successful ajax call landing in error
- [style] Implement category image buttons
- [refactor] Refactor base components to es6 and set preloaders
- [setup] Set up basic routing templates