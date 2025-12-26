Feature: E-commerce Product Purchasing Flow

  @ProductPurchasingFlow
  Scenario: Verify product purchasing flow
    Given User is on the welcome page
    Then User clicks on the challenges button
    When User clicks on the "E-commerce End-to-End Product Purchasing Flow" challenge button
    Then User should see "E-commerce End-to-End Product Purchasing Flow" title
    Then User verifies that the shopping cart is initially empty
    Then User verifies that he is on the product listing page
    Then User adds 3 "Smartphone Stand" to the cart
    Then User adds 1 "Wireless Headphones" to the cart
    Then User goes to the cart page
    Then User verifies that the cart shows a total of 2 products and 4 items
    Then User verifies that the total cost in the cart is equal to 255
    Then User proceeds to add Address details for shipping
    Then User verifies that "Proceed to Payment" button is disabled
    Then User enters "testuser", "testsurname", "teststreet 67" in the needed fields
    Then User verifies that "Proceed to Payment" button is enabled and clicks it
    Then User selects "Pay Now" option
    Then User verifies that the order confirmation page shows correct billing details and order summary
    Then User verifies that "Back to Home" button navigates back to the product listing page 
    
