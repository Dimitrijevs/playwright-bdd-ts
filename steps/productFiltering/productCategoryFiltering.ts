import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { locators } from "../../support/locators";

const { Given, When, Then } = createBdd();

When('User selects the {string} category from the category filter', async ({ page }, category: string) => {

    await page.getByLabel('category').click();

    const option = page.getByRole('option', { name: category, exact: true });
    
    await option.click();
    
    await page.waitForLoadState('networkidle');
});

Then(
  "User verifies that only products from the selected {string} category are displayed",
  async ({ page }, category: string) => {
    const productCategoryFields = page.locator(
      "p.MuiTypography-root.MuiTypography-body2.css-vouxdn"
    );

    const allCategories = await productCategoryFields.allInnerTexts();

    if (category === "All") {

      const uniqueCategories = new Set(allCategories.map((c) => c.trim()));
      expect(uniqueCategories.size).toBeGreaterThan(1);
    } else {

      for (const actualCategory of allCategories) {
            expect(actualCategory.trim()).toContain(category);
        }
    }
  }
);
