Feature: Login functionality

  @login @validLogin
  Scenario: Verify that user, admin can log in with valid credentials
    Given User is on the welcome page
    Then User clicks on the challenges button
    When User clicks on the "Role-Based Login Flow" challenge button
    Then User should see "Challenge Scenario" title
    Then User enters "<username>" and "<password>"
    Then User clicks on the login button
    Then User should see "<role>" based title
    Then User press the logout button
    Then User should not see welcome message

    Examples:
      | username | password | role  |
      | user     | user123  | user  |
      | admin    | admin123 | admin |

  @login @invalidLogin
  Scenario: Verify that user, admin cannot log in with invalid credentials
    Given User is on the welcome page
    Then User clicks on the challenges button
    When User clicks on the "Role-Based Login Flow" challenge button
    Then User should see "Challenge Scenario" title
    Then User enters "<username>" and "<password>"
    Then User clicks on the login button
    Then User should see "<message>" message

    Examples:
      | username | password | message                       |
      | user     | user     | Invalid username or password. |
      | admin    |          | Both fields are required.     |
      |          | test123  | Both fields are required.     |
      |          |          | Both fields are required.     |
