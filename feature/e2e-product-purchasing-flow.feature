Feature: E-commerce Product Purchasing Flow

  Background:
    Given User is on the welcome page

  @ProductPurchasingFlow
  Scenario: Verify product purchasing flow
    When User clicks on the challenges button
    And User clicks on the "E-commerce End-to-End Product Purchasing Flow" challenge button
    Then User should see "E-commerce End-to-End Product Purchasing Flow" title
    And User verifies that the shopping cart is initially empty
    And User verifies that he is on the product listing page
    When User adds 3 "Smartphone Stand" to the cart
    And User adds 1 "Wireless Headphones" to the cart
    And User goes to the cart page
    Then User verifies that the cart shows a total of 2 products and 4 items
    And User verifies that the total cost in the cart is equal to 255
    When User proceeds to add Address details for shipping
    Then User verifies that "Proceed to Payment" button is disabled
    When User enters "testuser", "testsurname", "teststreet 67" in the needed fields
    Then User verifies that "Proceed to Payment" button is enabled and clicks it
    When User selects "Pay Now" option
    Then User verifies that the order confirmation page shows correct billing details and order summary
    And User verifies that "Back to Home" button navigates back to the product listing page
