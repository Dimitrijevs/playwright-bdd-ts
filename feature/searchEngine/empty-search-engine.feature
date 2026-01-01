Feature: Empty Search Engine

    @EmptySearchEngine
    Scenario: Verify empty search engine functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "Simple Search Engine UI Automation Challenge" challenge button
        Then User should see "Simple Search Engine UI Automation Challenge" title
        Then User enters "" in the search input field
        Then User submits the search
        Then User verifies that no search results are displayed