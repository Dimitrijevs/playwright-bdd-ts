Feature: E-commerce Product Price Filtering 

    @ProductFiltering
    @ProductPriceFiltering
    Scenario: Verify product price filtering functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "E-commerce Product Filtering & Search" challenge button
        Then User should see "Filters" title
        Then User selects 1000 as the minimum price and 20000 as the maximum price on the price range filter
        Then User verifies that only products from the selected price range, 1000 to 20000, are displayed