Feature: E-commerce Product Category Filtering 

    @ProductFiltering
    @ProductCategoryFiltering
    Scenario: Verify product category filtering functionality
        Given User is on the welcome page
        Then User clicks on the challenges button
        When User clicks on the "E-commerce Product Filtering & Search" challenge button
        Then User should see "Filters" title
        Then User selects the "<category>" category from the category filter
        Then User verifies that only products from the selected "<category>" category are displayed

    Examples:
        | category    |
        | Electronics |
        | Sports      |
        | Clothing    |
        | All         |