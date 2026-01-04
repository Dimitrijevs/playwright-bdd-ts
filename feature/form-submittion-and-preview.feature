Feature: Job Application Form Submission And Preview

  @formSubmission
  Scenario: Form submission with valid data
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Job Application Form Automation Challenge" challenge button
    Then User should see "Job Application Form Automation Challenge" title
    When User fills the form data with:
      | salutation       | Mr.                        |
      | firstName        | Lukas                      |
      | lastName         | Weber                      |
      | email            | lukas.weber@example.de     |
      | mobileNumber     |                 4917654321 |
      | gender           | Male                       |
      | knownLanguages   | English, Other             |
      | resumeFilePath   | ./test-files/cv.pdf        |
      | skills           | JavaScript, React, Node.js |
      | jobRoles         | Frontend, FullStack        |
      | selfRating       |                          8 |
      | availabilityDate |                 2026-03-15 |
      | availabilityTime |                      09:30 |
      | termsAccepted    | true                       |
    And User submits the form
    Then User should see the successful submission message
    When User previews the submitted data
    Then The previewed data matches the submitted data

  @formSubmission
  Scenario: Form submission with invalid email
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Job Application Form Automation Challenge" challenge button
    Then User should see "Job Application Form Automation Challenge" title
    When User fills the form data with:
      | salutation       | Mr.                        |
      | firstName        | Lukas                      |
      | lastName         | Weber                      |
      | email            | lukas.weber                |
      | mobileNumber     |                 4917654321 |
      | gender           | Male                       |
      | knownLanguages   | English, Other             |
      | resumeFilePath   | ./test-files/cv.pdf        |
      | skills           | JavaScript, React, Node.js |
      | jobRoles         | Frontend, FullStack        |
      | selfRating       |                          8 |
      | availabilityDate |                 2026-03-15 |
      | availabilityTime |                      09:30 |
      | termsAccepted    | true                       |
    And User submits the form
    Then User should see the error message for invalid email

  @skillsInput
  Scenario: User can add and remove skills in the professional details section
    Given User is on the welcome page
    When User clicks on the challenges button
    And User clicks on the "Job Application Form Automation Challenge" challenge button
    Then User should see "Job Application Form Automation Challenge" title
    When User adds the following skills: "JavaScript, React, Node.js"
    Then The skills list shows: "JavaScript, React, Node.js"
    When User removes the skill "React"
    Then The skills list shows: "JavaScript, Node.js"
    And The skill "React" is no longer displayed
