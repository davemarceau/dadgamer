# 0.5: Pages added to new game search results (2023-03-22)

- Added the support for multiple pages of search results for easier navigation
- The new pages display allowed to update the maximum search results from 50 to 500
- Updated the profile menu to close on click both on options and outside the menu

# v0.4: Calendar updates and platforms support (2023-03-08)

- Added filter and sort options to the games available to be added as sessions on the calendar
- Added a display if no games are found either in the collection or the filter
- Added the option to filter by platform on game search

# v0.4: Homepage behavior, Calendar fix (2023-03-08)

- Updated the loading methods to show partial menus as it loads the data
- Fixed loading status to properly display the loading icon
- Updated Global font
- Fixed a bug that would prevent sessions to be moved to another date

# v0.3: Collection page cleanup (2023-03-03)

- Allowed the games to wrap horizontally on larger displays for easier collection browsing
- Allowed for small vs extended display for easier navigation
- Added sort option in the collection screen
- Added a search option in the collection screen
- The collection screen now displays something if either the collection has no games or the search returns no results
- Fixed the new game search so it allows the search term not to be at the start of the title

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
