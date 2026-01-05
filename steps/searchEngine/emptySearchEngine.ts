import { expect } from "@playwright/test";
import { Then } from "../../support/fixtures";

Then('User verifies that no search results are displayed', async ({page}) => {
  
    const searchResultsContainer = page.locator('div.mt-8.w-full.max-w-2xl.space-y-4');

    await expect(searchResultsContainer).toHaveCount(0);
});