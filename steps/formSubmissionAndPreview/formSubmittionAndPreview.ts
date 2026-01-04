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

    const knownLanguages = dataTable.rowsHash().knownLanguages.split(",").map((lang) => lang.trim());
    for (const language of knownLanguages) {
      await page.getByRole("checkbox", { name: language.trim() }).check();
    }

    // resume upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.locator("input.border-2.p-1.rounded-xs").click(),
    ]);
    const resumeFilePath = dataTable.rowsHash().resumeFilePath.trim();
    await fileChooser.setFiles(resumeFilePath);
    const fileName = parse(resumeFilePath).base;
    const fileNameLocator = page.locator('div.MuiBox-root.css-164r41r > a');
    await expect(fileNameLocator).toHaveText(fileName);

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

    ctx.jobApplicationForm!.salutation = dataTable.rowsHash().salutation;
    ctx.jobApplicationForm!.firstName = dataTable.rowsHash().firstName;
    ctx.jobApplicationForm!.lastName = dataTable.rowsHash().lastName;
    ctx.jobApplicationForm!.email = dataTable.rowsHash().email;
    ctx.jobApplicationForm!.mobileNumber = dataTable.rowsHash().mobileNumber;
    ctx.jobApplicationForm!.gender = dataTable.rowsHash().gender;
    ctx.jobApplicationForm!.knownLanguages = dataTable.rowsHash().knownLanguages;
    ctx.jobApplicationForm!.resumeFileName = fileName;
    ctx.jobApplicationForm!.skills = skills;
    ctx.jobApplicationForm!.jobRoles = jobRoles;
    ctx.jobApplicationForm!.selfRating = amountOfClicks;
    ctx.jobApplicationForm!.availabilityDate = dataTable.rowsHash().availabilityDate;
    ctx.jobApplicationForm!.availabilityTime = dataTable.rowsHash().availabilityTime;
    ctx.jobApplicationForm!.termsAccepted = dataTable.rowsHash().termsAccepted === "true";
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

When('User previews the submitted data', async ({page}) => {
  
  await page.getByRole('button', { name: 'Preview' }).click();
});

Then('The previewed data matches the submitted data', async ({page, ctx}) => {
  
  const previewDialogContainer = page.locator('div.space-y-4.MuiBox-root.css-0');
  await expect(previewDialogContainer).toBeVisible();

  await expect(previewDialogContainer.getByText(`Salutation: ${ctx.jobApplicationForm!.salutation}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Name: ${ctx.jobApplicationForm!.firstName} ${ctx.jobApplicationForm!.lastName}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Email: ${ctx.jobApplicationForm!.email}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Mobile: ${ctx.jobApplicationForm!.mobileNumber}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Gender: ${ctx.jobApplicationForm!.gender}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Languages: ${ctx.jobApplicationForm!.knownLanguages}`, { exact: true })).toBeVisible();

  const resumeLink = await previewDialogContainer.getByRole('link');
  await expect(resumeLink).toHaveText(ctx.jobApplicationForm!.resumeFileName!);

  const skillsLocator = previewDialogContainer.locator('div.MuiBox-root.css-zefc5s').nth(0);
  const skillsArray = await skillsLocator.locator('> div > span').allInnerTexts();
  await expect(skillsArray).toEqual(ctx.jobApplicationForm!.skills!);

  const jobRolesLocator = previewDialogContainer.locator('div.MuiBox-root.css-zefc5s').nth(1);
  const jobRolesArray = await jobRolesLocator.locator('> div > span').allInnerTexts();
  await expect(jobRolesArray).toEqual(ctx.jobApplicationForm!.jobRoles!);

  await expect(previewDialogContainer.getByText(`${ctx.jobApplicationForm!.selfRating} / 10`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Date: ${ctx.jobApplicationForm!.availabilityDate}`, { exact: true })).toBeVisible();
  await expect(previewDialogContainer.getByText(`Time: ${ctx.jobApplicationForm!.availabilityTime}`, { exact: true })).toBeVisible();

  await expect(previewDialogContainer.locator('p.css-1o5u7u9').last()).toHaveText(ctx.jobApplicationForm!.termsAccepted ? 'Accepted' : 'Not Accepted');

  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
