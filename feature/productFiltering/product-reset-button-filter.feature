Feature: E-commerce Product Reset Button Filtering 

    @ProductFiltering
    @ProductResetButtonFiltering
    Scenario: Verify product reset button filtering functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "E-commerce Product Filtering & Search" challenge button
        Then User should see "Filters" title
        Then User selects the "Electronics" category from the category filter
        Then User selects price up to 60000 from the Price Range filter dropdown
        Then User checks the In Stock Only filter checkbox
        Then User clicks on the Reset Filters button
        Then User verifies that all filters are cleared 
        Then User verifies that all, 15 products are displayed again