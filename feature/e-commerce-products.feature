Feature: E-commerce Products

  @ProductFiltering @ProductCategoryFiltering
  Scenario: Verify product category filtering functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Filtering & Search" challenge button
    Then User should see "Filters" title
    When User selects the "<category>" category from the category filter
    Then User verifies that only products from the selected "<category>" category are displayed

    Examples:
      | category    |
      | Electronics |
      | Sports      |
      | Clothing    |
      | All         |

  @ProductFiltering @ProductInStockOnlyFiltering
  Scenario: Verify product in stock only filtering functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Filtering & Search" challenge button
    Then User should see "Filters" title
    When User checks the In Stock Only filter checkbox
    Then User verifies that only products that are "in stock" are displayed

  @ProductFiltering @ProductMinRatingFiltering
  Scenario: Verify product minimum rating filtering functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Filtering & Search" challenge button
    Then User should see "Filters" title
    When User clicks on the 4th star in the minimum rating filter
    Then User verifies that only products with a rating of 4 stars and above are displayed

  @ProductFiltering @ProductPriceFiltering
  Scenario: Verify product price filtering functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Filtering & Search" challenge button
    Then User should see "Filters" title
    When User selects 1000 as the minimum price and 20000 as the maximum price on the price range filter
    Then User verifies that only products from the selected price range, 1000 to 20000, are displayed

  @ProductFiltering @ProductResetButtonFiltering
  Scenario: Verify product reset button filtering functionality
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "E-commerce Product Filtering & Search" challenge button
    Then User should see "Filters" title
    When User selects the "Electronics" category from the category filter
    And User selects price up to 60000 from the Price Range filter dropdown
    And User checks the In Stock Only filter checkbox
    And User clicks on the Reset Filters button
    Then User verifies that all filters are cleared
    And User verifies that all, 15 products are displayed again
