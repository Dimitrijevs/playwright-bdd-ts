import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then('User clicks on the 4th star in the minimum rating filter', async ({page}) => {
  
    const fourthStar = page.locator("//span[@class='MuiRating-root MuiRating-sizeMedium css-r2qk9h']//span[4]");
    await fourthStar.click();
    await page.waitForLoadState('networkidle');

    const innerSpan = fourthStar.locator('span').first();

    await expect(innerSpan).toHaveClass(/MuiRating-iconFilled/);

});

Then('User verifies that only products with a rating of {int} stars and above are displayed', async ({page}, minRating: number) => {
  
    const productList = page.locator('div.space-y-3.overflow-y-auto.MuiBox-root.css-0');
    const productCards = productList.locator('> div');

    const totalProducts = await productCards.count();

    if (totalProducts !== 0) {
        for (let i = 0; i < totalProducts; i++) {
            const product = productCards.nth(i);
            
            const detailsText = await product.locator('p.MuiTypography-body2').innerText();

            const parts = detailsText.split('⭐');

            const actualRating = parseFloat(parts[1].trim());

            expect(actualRating).toBeGreaterThanOrEqual(minRating);
        }
    }
});