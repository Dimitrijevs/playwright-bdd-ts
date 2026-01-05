Feature: E-commerce Product Listing & Pagination

  @ProductListingAndPagination
  Scenario: Verify product listing and pagination functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Listing & Pagination" challenge button
    Then User should see "Explore Our Products" title
    And the "Prev" pagination button should be disabled
    And User verifies each page has 10 products with valid images, titles, categories, ratings, and prices
    And the "Next" pagination button should be disabled
    And User verifies that clicking "Next" and "Prev" buttons navigates through the product pages correctly
