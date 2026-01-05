Feature: Search Engine

  @SearchOption @ValidSearchEngine
  Scenario: Verify valid search engine functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Simple Search Engine UI Automation Challenge" challenge button
    Then User should see "Simple Search Engine UI Automation Challenge" title
    When User enters "Playwright BDD" in the search input field
    And User submits the search
    Then User verifies that the top 3 search results contains "Playwright BDD"

  @SearchOption @EmptySearchEngine
  Scenario: Verify empty search engine functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Simple Search Engine UI Automation Challenge" challenge button
    Then User should see "Simple Search Engine UI Automation Challenge" title
    When User enters "" in the search input field
    And User submits the search
    Then User verifies that no search results are displayed
