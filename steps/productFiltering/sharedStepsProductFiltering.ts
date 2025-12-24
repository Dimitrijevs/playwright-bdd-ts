import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

When('User selects the {string} category from the category filter', async ({ page }, category: string) => {

    await page.getByLabel('category').click();

    const option = page.getByRole('option', { name: category, exact: true });
    
    await page.waitForLoadState('networkidle');

    await option.click();
});

Then("User checks the In Stock Only filter checkbox", async ({ page }) => {
  const checkBox = page.locator("input.PrivateSwitchBase-input.css-j8yymo");

  await checkBox.check();

  await page.waitForLoadState("networkidle");

  expect(await checkBox.isChecked()).toBe(true);
});