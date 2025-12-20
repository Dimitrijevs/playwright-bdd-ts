Feature: Welcome Page Elements

    @WelcomePageElements
    Scenario: Verify presence of welcome page elements
        Given User navigates to the welcome page
        Then User should see app logo
        Then User should see welcome message - "Practice Automation Testing the Way It Happens in the Real World"
        Then User should see "Start Exploring" and "Challenges" buttons
        Then User should see features section with 3 elements
        Then User should see "How it works?" section with 3 steps
        Then User should see "Share. Suggest. Shape." section
        Then User should see footer with app logo and links