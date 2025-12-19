import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { locators } from '../support/locators';
import { text } from 'stream/consumers';

const { Given, When, Then } = createBdd();

Then('User should see app logo', async ({ page }) => {

    const logo = page.locator(locators.appLogo);
    await expect(logo).toBeVisible();
});

Then("User should see welcome message - {string}", async({ page }, message: string) => {
    const welcomeMessage = page.locator('h1:has-text("Practice Automation Testing the Way It Happens in the Real World")')

    await expect(welcomeMessage).toHaveText(message);
});

Then("User should see {string} and {string} buttons", async({ page }, button1: string, button2: string) => {
    
    const firstButton = page.locator(':text-is("Start Exploring")');
    const secondButton = page.locator('button').filter({ hasText: 'Challenges' });

    await expect(firstButton).toHaveText(button1);
    await expect(secondButton).toHaveText(button2);
});

Then("User should see features section with {int} elements", async({ page }, elementCount: number) => {

    const featuresSection = page.locator("//div[@class='grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3']")
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

    const stepsSectionTitle = page.locator("div[id='how-it-works'] p[class='MuiTypography-root MuiTypography-body1 css-ifohs8']")
    await expect(stepsSectionTitle).toHaveText(sectionName);

    const stepsSection = page.locator('div.flex.flex-col.gap-20.md\\:gap-28.px-4.md\\:px-20');
    // 'div' - finds all the divs, 
    // '> div' - finds only direct children divs
    const steps = stepsSection.locator('> div');

    await expect(steps).toHaveCount(stepCount);

    for (let i = 0; i < stepCount; i++) {
        const step = steps.nth(i);

        const stepNumber = await step.locator('> div > div.flex.items-center > span.rounded-full');
        await expect(stepNumber).toBeVisible();

        const stepTitle = await step.locator('> div > div.flex.flex-col > p.css-crrd50');
        await expect(stepTitle).toBeVisible();

        const stepDescription = await step.locator('> div > div.flex.flex-col > p.css-1segk83');
        await expect(stepDescription).toBeVisible();

        const stepImage = await step.locator('> div.flex.justify-center > img');
        await expect(stepImage).toBeVisible();
    }
});

// Then('User should see {string} section', async ({ page }, sectionName: string) => {
//     // TODO: Implement verification for section
// });

// Then('User should see footer with app logo and links', async ({ page }) => {
//     // TODO: Implement verification for footer
// });