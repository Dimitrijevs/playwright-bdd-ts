import { expect } from "@playwright/test";
import { Then } from "../../support/fixtures";

Then('User verifies that the top {int} search results contains {string}', async ({page}, amountOfResults: number, searchTerm: string) => {
  
    const searchResultsContainer = page.locator('div.mt-8.w-full.max-w-2xl.space-y-4');

    const searchResults = searchResultsContainer.locator('> div');

    for (let i = 0; i < amountOfResults; i++) {
        const container = searchResults.nth(i);
        
        const linkLocator = container.locator('a');

        const linkText = await linkLocator.innerText();

        expect(linkText.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
});
