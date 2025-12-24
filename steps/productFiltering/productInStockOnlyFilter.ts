import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then("User checks the In Stock Only filter checkbox", async ({ page }) => {
  const checkBox = page.locator("input.PrivateSwitchBase-input.css-j8yymo");

  await checkBox.check();

  await page.waitForLoadState("networkidle");

  expect(await checkBox.isChecked()).toBe(true);
});

Then(
  "User verifies that only products that are {string} are displayed",
  async ({ page }, stockStatus: string) => {
    
    const productList = page.locator('div.space-y-3.overflow-y-auto.MuiBox-root.css-0');
    const productCards = productList.locator('> div');

    const totalProducts = await productCards.count();

    if (totalProducts !== 0) {
        for (let i = 0; i < totalProducts; i++) {

            const product = productCards.nth(i);
            
            const statusText = await product.locator('span.MuiTypography-caption').innerText();

            expect(statusText.toLowerCase()).toContain(stockStatus.toLowerCase());
        }
    }
  }
);
