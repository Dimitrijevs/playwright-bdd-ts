import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { locators } from '../support/locators';

const { Then } = createBdd();

Then('User should see app logo', async ({ page }) => {

    const logo = page.locator(locators.webApp.appLogo);
    await expect(logo).toBeVisible();
});

Then("User should see welcome message - {string}", async({ page }, message: string) => {
    const welcomeMessage = page.locator(locators.welcomePage.welcomeMessage);

    await expect(welcomeMessage).toHaveText(message);
});

Then("User should see {string} and {string} buttons", async({ page }, button1: string, button2: string) => {
    
    const firstButton = page.locator(locators.welcomePage.startExploringButton);
    const secondButton = page.locator(locators.welcomePage.challengesButton);

    await expect(firstButton).toHaveText(button1);
    await expect(secondButton).toHaveText(button2);
});

Then("User should see features section with {int} elements", async({ page }, elementCount: number) => {

    const featuresSection = page.locator(locators.welcomePage.featuresSection);
    const links = featuresSection.locator('a');
    
    await expect(links).toHaveCount(elementCount);
    
    for (let i = 0; i < elementCount; i++) {
        const link = links.nth(i);

        const image = await link.locator('img').getAttribute('src');
        const title = await link.locator('h3').textContent();
        const text = await link.locator('p').textContent();
        
        // console.log(`Link ${i + 1}:`, { image, title, text });
        
        expect(image).toBeTruthy();
        expect(title?.trim()).toBeTruthy();
        expect(text?.trim()).toBeTruthy();
    }
});

Then('User should see {string} section with {int} steps', async ({ page }, sectionName: string, stepCount: number) => {

    const stepsSectionTitle = page.locator(locators.welcomePage.stepsSectionTitle);
    await expect(stepsSectionTitle).toHaveText(sectionName);

    const stepsSection = page.locator(locators.welcomePage.stepsSection);
    // 'div' - finds all the divs, 
    // '> div' - finds only direct children divs
    const steps = stepsSection.locator('> div');

    await expect(steps).toHaveCount(stepCount);

    for (let i = 0; i < stepCount; i++) {
        const step = steps.nth(i);

        const stepNumber = await step.locator(locators.welcomePage.stepsSectionItems.stepNumber);
        await expect(stepNumber).toBeVisible();

        const stepTitle = await step.locator(locators.welcomePage.stepsSectionItems.stepTitle);
        await expect(stepTitle).toBeVisible();

        const stepDescription = await step.locator(locators.welcomePage.stepsSectionItems.stepDescription);
        await expect(stepDescription).toBeVisible();

        const stepImage = await step.locator(locators.welcomePage.stepsSectionItems.stepImage);
        await expect(stepImage).toBeVisible();
    }
});

Then('User should see {string} section', async ({ page }, sectionName: string) => {
    const sectionTitle = page.locator(locators.welcomePage.motivationalSectionTitle);
    await expect(sectionTitle).toHaveText(sectionName);

    const sectionParagraph = page.locator(locators.welcomePage.motivationalSectionParagraph);
    await expect(sectionParagraph).toBeVisible();
});

Then('User should see footer with app logo and links', async ({ page }) => {
    
    const footerLogo = page.locator(locators.welcomePage.footerLogo);
    await expect(footerLogo).toBeVisible();

    const footerTopicsSection = page.locator(locators.welcomePage.footerTopicsSection);
    await expect(footerTopicsSection).toBeVisible();

    const footerLinksSection = page.locator(locators.welcomePage.footerLinksSection);
    await expect(footerLinksSection).toBeVisible();
});