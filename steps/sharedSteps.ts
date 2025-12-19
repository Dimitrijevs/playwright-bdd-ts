import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { locators } from '../support/locators';

const { Given, When, Then } = createBdd();

Given('User navigates to the welcome page', async ({ page }) => {
    await page.goto(locators.link);
});