Feature: E-commerce Product Listing & Pagination

  @ProductListingAndPagination
  Scenario: Verify product listing and pagination functionality
    Given User is on the welcome page
    Then User clicks on the challenges button
    When User clicks on the "E-commerce Product Listing & Pagination" challenge button
    Then User should see "Explore Our Products" title

    # Boundary check: Start
    Then the "Prev" pagination button should be disabled

    # Core logic (Looping)
    Then User verifies each page has 10 products with valid images, titles, categories, ratings, and prices
    
    # Boundary check: End
    Then the "Next" pagination button should be disabled

    Then User verifies that clicking "Next" and "Prev" buttons navigates through the product pages correctly
