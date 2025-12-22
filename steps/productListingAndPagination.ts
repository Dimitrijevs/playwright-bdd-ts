import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { locators } from '../support/locators';

const { Given, When, Then } = createBdd();

Then('User clicks on the challenges button', async ({page}) => {
  
    await page.locator(locators.welcomePage.challengesButton).click();
});

When('User clicks on the E-commerce Product Listing & Pagination challenge button', async ({page}) => {
  
    await page.locator(locators.productListingAndPaginationPage.link).click();
});

Then('User should see {string} title', async ({page}, title: string) => {
  
    const productPageTitle = page.getByText(title, { exact: true }); 
    await expect(productPageTitle).toBeVisible();
});

// repreated step
Then('the {string} pagination button should be disabled', async ({page}, buttonName: string) => {
  
    const button = page.getByRole('button', { name: buttonName, exact: true });
    await expect(button).toBeDisabled();
});

Then('User verifies each page has {int} products with valid images, titles, categories, ratings, and prices', async ({page}, numberOfCards: number) => {
  
    const nextButton = page.getByRole('button', { name: 'Next', exact: true });
    
    let buttonEnabled: boolean;

    do {
        const productsList = page.locator(locators.productListingAndPaginationPage.productsList);
        const productsCard = productsList.locator('> div');
        const totalProducts = await productsCard.count();
        
        expect(totalProducts).toBe(numberOfCards);
        
        for (let i = 0; i < totalProducts; i++) {
            const product = productsCard.nth(i);
            
            const productTitle = product.locator('> div > h6.font-semibold');
            await expect(productTitle).toBeVisible();
            
            const productCategory = product.locator('> div > p');
            await expect(productCategory).toBeVisible();
            
            const productPrice = product.locator('> div > h6.text-green-600');
            await expect(productPrice).toBeVisible();
            
            const productRating = product.locator('> div > span');
            await expect(productRating).toBeVisible();
        }

        buttonEnabled = await nextButton.isEnabled();

        if (buttonEnabled) {

            await nextButton.click();
            await page.waitForLoadState('networkidle');
        }

    } while (buttonEnabled);

});

Then('User verifies that clicking {string} and {string} buttons navigates through the product pages correctly', async ({ page }, nextButtonTitle: string, prevButtonTitle: string) => {
    
    page.getByRole('button', { name: 'Go to page 1' }).click();
    await page.waitForLoadState('networkidle');
    
    let pageNum = 1;

    expect(pageNum).toBe(1);

    const nextButton = page.getByRole('button', { name: nextButtonTitle, exact: true });
    const prevButton = page.getByRole('button', { name: prevButtonTitle, exact: true });

    const firstPage = page.getByRole('button', { name: `page ${pageNum}` });
    await expect(firstPage).toHaveClass(/Mui-selected/);
    await expect(prevButton).toBeDisabled();

    while (await nextButton.isEnabled()) {
        await nextButton.click();
        pageNum++;
        
        await page.waitForLoadState('networkidle');

        const currentPageButton = page.getByRole('button', { name: `page ${pageNum}`, exact: true });
        await expect(currentPageButton).toHaveClass(/Mui-selected/);
        
        await expect(prevButton).toBeEnabled();
    }

    while (await prevButton.isEnabled()) {
        await prevButton.click();
        pageNum--;
        
        await page.waitForLoadState('networkidle');

        const currentPageButton = page.getByRole('button', { name: `page ${pageNum}`, exact: true });
        await expect(currentPageButton).toHaveClass(/Mui-selected/);
    }
    
    expect(pageNum).toBe(1);
});
