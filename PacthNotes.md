# v0.2: Minor fixes (2023-02-19)

- Fixed an issue where the order of the days in the calendar would not always follow the days of the week
- Added the user specific Gender in the header instead of the constant DadGamer
- Moved context files to their own folder for easier files navigation
- Moved the main routing to its own "MainContent" component for clearer App
- Fixed a bug where "Next sessions" of the home page could generate the same key if the same game repeated in the next 3 sessions
- Significant performance fix using the React Router Link instead of the standard links which would cause the entire page reload, which include the DB data get
- Fixed a bug in Calendar where the new performance would make the render error out with data not yet ready to deal with an array

# v0.1: Original project (2022-12-05)

This was the original submission of the project for the Concordia Bootcamp
