--- Backend project

Data
  [x] Implement immutable.js for stores
  [x] Let getQuestionsForParty return a map

Question Answer Table
  [ ] Include settings for parties in qa table
  [ ] Make it possible to display many parties
  [ ] Make a hint that a qa-table has hidden parties
  [ ] Possibility to star a question, making them appear on top, even when sorting
    * First starred questions are sorted, then the rest
  [ ] Make it possible to clear all starred questions
  [ ] Hide questions without visible answers, even when showing/hiding parties?
  [ ] Make the header work

Pages
  [ ] Implement quiz-page
  [x] Implement tags-page
  [ ] Search result page
  [x] Settings page
    [x] Filter parties
      * Save to cookies
  [ ] Statistics on party page
    * Answered/unanswered questions
  [ ] Add more info on question page
  [ ] Add more info on party page
  [ ] Add more info on answer page

Design
  [ ] Hero Party page with big parallax logo

Optimize
  [ ] Add shouldComponentUpdate to all components and pages. where should filtering be done? every time a filter is done, a new map is created
  [ ] Move dependencies in package.json to devDependencies and maybe create a separate for server?

Components
  [ ] Create a search component
    * Tags
    * Questions (everywhere)
    * Parties
    * Order
      * 1. Parties
      * 2. Questions
      * 3. Questions by tag
      * 4. Tag
      * Limit by x, with link to search page
    [ ] Clear input on navigate (add input string in store?)
  [ ] Create a loading spinner
    * Full screen
    * Component only

Project
  [ ] Clean up not needed files
  [ ] Find out a good way to debug node.js apps
  [ ] Make hot reloading work as expected
  [ ] Lint
  [ ] Simplify actions, remove/combine redundant files
  [ ] Change html header (title etc)
  [x] Create nice routes
    * Parties
    * Questions
    * Answers
  [x] Make even nicer routes
    * All lower case?
    * Replace %20 with _ or something to make it look better
  [x] Gör alla id till string/int för att få bort parseInt, kanske alla ska vara guids?

Test
  [ ] Add tests for PartiskStore to make sure the linked data looks good

Database
  [ ] Clean up unused colums in db
  [ ] Make ids to only string or only int


--- Data project
Existing data
  [ ] Revisit all questions and make the naming consistent
  [ ] Make a standard for quotes, make sure that all answers comply
  [ ] Revisit all descriptions, make them concise.

New data


--- Ideas
[ ] Tag all questions by "Lower tax"/"Increase tax", "More laws"/"Less laws", "Less equality"/"More equality", "Authoritorian"/"Libertarian", "Socialism"/"Capitalism"?
  * To make a political map of the parties
[ ] Make a compare parties page
  * Compare questions by tag/group
