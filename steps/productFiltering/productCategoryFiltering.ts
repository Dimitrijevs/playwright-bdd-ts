import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

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
