import { expect } from "@playwright/test";
import { DataTable } from "playwright-bdd";
import { Given, When, Then } from "../../support/fixtures";
import { parse } from "path";

When(
  "User fills the form data with:",
  async ({ page, ctx }, dataTable: DataTable) => {

    // personal details
    await page
      .locator('input[name="salutation"]')
      .fill(dataTable.rowsHash().salutation);
    await page
      .locator('[name="firstName"]')
      .fill(dataTable.rowsHash().firstName);
    await page.locator('[name="lastName"]').fill(dataTable.rowsHash().lastName);
    await page.locator('[name="email"]').fill(dataTable.rowsHash().email);
    await page
      .locator('[name="mobile"]')
      .fill(dataTable.rowsHash().mobileNumber);
    await page.getByLabel(dataTable.rowsHash().gender, { exact: true }).click();

    for (const language of dataTable.rowsHash().knownLanguages.split(",")) {
      await page.getByRole("checkbox", { name: language.trim() }).check();
    }

    // resume upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.locator("input.border-2.p-1.rounded-xs").click(),
    ]);
    await fileChooser.setFiles(dataTable.rowsHash().resumeFilePath.trim());

    // skills
    const slillString = dataTable.rowsHash().skills;
    const skills = slillString.split(",").map((skill) => skill.trim());
    
    const input = page.locator('div.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.css-1syh60j input');
    for (const skill of skills) {
      await input.pressSequentially(skill, { delay: 200 });
      await input.press("Enter");
    }

    // job roles
    page.getByRole("combobox").click();
    const jobRolesString = dataTable.rowsHash().jobRoles;
    const jobRoles = jobRolesString.split(",").map((role) => role.trim());
    const jobRolesListLocator = page.getByRole("listbox");
    await expect(jobRolesListLocator).toBeVisible();
    for (const role of jobRoles) {
      const menuItem = jobRolesListLocator.getByRole("option", { name: role });

      const checkbox = menuItem.locator('input[type="checkbox"]');
      await checkbox.check();
    }
    await page.locator('body').click({ position: { x: 10, y: 10 } });

    // self rating
    const amountOfClicks = parseInt(dataTable.rowsHash().selfRating, 10);
    const selfRatingButton = page.locator('span.MuiSlider-thumb.MuiSlider-thumbSizeMedium.MuiSlider-thumbColorPrimary.MuiSlider-thumb.MuiSlider-thumbSizeMedium.MuiSlider-thumbColorPrimary.css-1gp22ab');
    await selfRatingButton.click();
    for (let i = 0; i < amountOfClicks; i++) {
      await page.keyboard.press("ArrowRight");
    }

    // availability date
    const dateLocator = page.locator('[name="availableDate"]');
    await dateLocator.fill(dataTable.rowsHash().availabilityDate);

    // availability time
    const timeLocator = page.locator('[name="availableTime"]');
    await timeLocator.fill(dataTable.rowsHash().availabilityTime);

    // terms and conditions
    if (dataTable.rowsHash().termsAccepted === "true") {
      await page.locator('[name="termsAccepted"]').check();
    }
  }
);

When("User submits the form", async ({page}) => {
  await page.getByRole('button', { name: 'Submit' }).click();
});

Then("User should see the successful submission message", async ({page}) => {
  
  const successFormSubmittionMessage = page.getByText('Application Submitted Successfully!', { exact: true });
  await expect(successFormSubmittionMessage).toBeVisible();
});

Then("User should see the error message for invalid email", async ({page}) => {
  
  const successFormSubmittionMessage = page.getByText('Application Submitted Successfully!', { exact: true });
  await expect(successFormSubmittionMessage).toBeVisible();

  const emailErrorMessage = page.getByText('Enter a valid email', { exact: true });
  await expect(emailErrorMessage).toBeVisible();
});
