import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { locators } from "../../support/locators";

const { Given, When, Then } = createBdd();

Then('User selects {int} as the minimum price and {int} as the maximum price on the price range filter', async ({page}, minPrice: number, maxPrice: number) => {
    
    const totalRangeSteps: number = 80;

    const minThumb = page.locator('input[data-index="0"]');
    const maxThumb = page.locator('input[data-index="1"]');

    await minThumb.focus();
    for (let i = 0; i < minPrice / 1000; i++) {
        await page.keyboard.press('ArrowRight');
    }

    await maxThumb.focus();
    for (let i = 0; i < totalRangeSteps - maxPrice / 1000; i++) {
        await page.keyboard.press('ArrowLeft');
    }

    await expect(minThumb).toHaveAttribute('aria-valuenow', minPrice.toString());
    await expect(maxThumb).toHaveAttribute('aria-valuenow', maxPrice.toString());
});

Then('User verifies that only products from the selected price range, {int} to {int}, are displayed', async ({page}, minPrice: number, maxPrice: number) => {
  
    const productList = page.locator('div.space-y-3.overflow-y-auto.MuiBox-root.css-0');
    const productCards = productList.locator('> div');

    const totalProducts = await productCards.count();

    if (totalProducts !== 0) {
        for (let i = 0; i < totalProducts; i++) {
            const product = productCards.nth(i);
            
            const detailsText = await product.locator('p.MuiTypography-body2').innerText();

            expect(detailsText).toBeGreaterThanOrEqual(minPrice);
            expect(detailsText).toBeLessThanOrEqual(maxPrice);
        }
    }
});
