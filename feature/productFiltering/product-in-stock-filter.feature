Feature: E-commerce Product In Stock Only Filtering 

    @ProductFiltering
    @ProductInStockOnlyFiltering
    Scenario: Verify product in stock only filtering functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "E-commerce Product Filtering & Search" challenge button
        Then User should see "Filters" title
        Then User checks the In Stock Only filter checkbox
        Then User verifies that only products that are "in stock" are displayed