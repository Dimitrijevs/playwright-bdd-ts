import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { locators } from '../support/locators';

const { Given, When, Then } = createBdd();

Given('User is on the welcome page', async ({ page }) => {
    await page.goto(locators.webApp.link);
});

Then('User clicks on the challenges button', async ({page}) => {
  
    await page.locator(locators.welcomePage.challengesButton).click();
});

Then('User should see {string} title', async ({page}, title: string) => {
  
    const productPageTitle = page.getByText(title, { exact: true }); 
    await expect(productPageTitle).toBeVisible();
});

When('User clicks on the {string} challenge button', async ({ page }, challengeTitle: string) => {
    
    const challengeCard = page.locator('.MuiCard-root').filter({ hasText: challengeTitle });

    await challengeCard.getByRole('button', { name: 'View Challenge' }).click();
});