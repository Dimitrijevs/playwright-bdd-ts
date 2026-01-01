import { expect } from "@playwright/test";
import { Given, When, Then } from "../../support/fixtures";

Then('User enters {string} in the search input field', async ({page}, request: string) => {

    const searchInput = page.getByTestId('search-input');

    await searchInput.pressSequentially(request, { delay: 300 });
});

Then('User submits the search', async ({page}) => {
  
    await page.getByTestId('search-button').click();
});