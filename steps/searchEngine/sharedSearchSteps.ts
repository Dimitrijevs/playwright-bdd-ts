import { When } from "../../support/fixtures";

When('User enters {string} in the search input field', async ({page}, request: string) => {

    const searchInput = page.getByTestId('search-input');

    await searchInput.pressSequentially(request, { delay: 200 });
});

When('User submits the search', async ({page}) => {
  
    await page.getByTestId('search-button').click();
});