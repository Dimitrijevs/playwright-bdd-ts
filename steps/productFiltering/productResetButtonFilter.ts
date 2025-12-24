import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then('User selects price up to {int} from the Price Range filter dropdown', async ({page}, maxPrice: number) => {
  
  const totalRangeSteps: number = 80;

  const maxThumb = page.locator('input[data-index="1"]');

  await maxThumb.focus();
    for (let i = 0; i < totalRangeSteps - maxPrice / 1000; i++) {
        await page.keyboard.press('ArrowLeft');
    }

  await expect(maxThumb).toHaveAttribute('aria-valuenow', maxPrice.toString());
});

Then('User clicks on the Reset Filters button', async ({page}) => {
  
  const resetButton = page.locator('button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSecondary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorSecondary.MuiButton-fullWidth.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSecondary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorSecondary.MuiButton-fullWidth.css-16q1e93');
  
  await resetButton.click();
});

Then('User verifies that all filters are cleared', async ({page}) => {

  // category
  const categoryFilter = page.locator('div.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.css-1ndjmue:visible');
  await expect(categoryFilter).toHaveText('All');
  
  // price
  const minThumb = page.locator('input[data-index="0"]');
  const maxThumb = page.locator('input[data-index="1"]');

  await expect(minThumb).toHaveAttribute('aria-valuenow', '0');
  await expect(maxThumb).toHaveAttribute('aria-valuenow', '80000');

  // in stock only
  const inStockOnly = page.locator('input.PrivateSwitchBase-input.css-j8yymo');
  await expect(inStockOnly).not.toBeChecked();
});

Then('User verifies that all, {int} products are displayed again', async ({page}, expectedProductCount: number) => {
  
  const productList = page.locator('div.space-y-3.overflow-y-auto.MuiBox-root.css-0');

  const productCards = productList.locator('> div');

  expect(await productCards.count()).toBe(expectedProductCount);
});