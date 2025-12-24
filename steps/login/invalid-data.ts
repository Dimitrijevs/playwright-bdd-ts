import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then('User should see {string} message', async ({page}, message: string) => {
  
    const errorMessage = page.locator('.MuiAlert-standardError .MuiAlert-message');

    await expect(errorMessage).toContainText(message);
});