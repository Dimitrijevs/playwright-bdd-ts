Feature: Social Media Feed Interaction

  @SocialMediaFeedInteraction
  Scenario: Verify social media feed interactions
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Social Media Feed Interaction Challenge" challenge button
    Then User should see "Social Media Feed Interaction Challenge" title

    And User verifies that the <postOrderNumber> post contains an profile image, username, post image, like button, like count
    
    When User likes the post, verifies that the like count changes by 1
    Then User verifies that notification recieved about successful like
    When User unlikes the post, verifies that the like count changes by 1
    Then User verifies that notification recieved about successful unlike

    Examples:
      | postOrderNumber |
      |               0 |
      |               1 |
      |               2 |
