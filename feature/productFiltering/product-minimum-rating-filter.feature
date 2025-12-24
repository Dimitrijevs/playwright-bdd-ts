Feature: E-commerce Product Minimum Rating Filtering 

    @ProductFiltering
    @ProductMinRatingFiltering
    Scenario: Verify product minimum rating filtering functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "E-commerce Product Filtering & Search" challenge button
        Then User should see "Filters" title
        Then User clicks on the 4th star in the minimum rating filter
        Then User verifies that only products with a rating of 4 stars and above are displayed