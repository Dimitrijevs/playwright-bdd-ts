import { expect } from "@playwright/test";
import { Given, When, Then } from "../support/fixtures";

Then('User verifies that the shopping cart is initially empty', async ({page}) => {
  
  const cartBadge = page.locator('.MuiBadge-badge');

  await expect(cartBadge).toHaveClass(/MuiBadge-invisible/);
});

Then('User verifies that he is on the product listing page', async ({page}) => {
  
  const productList = page.locator('div.flex.flex-wrap.gap-6.justify-center');

  const productCards = await productList.locator('> div');

  await expect(productCards).toHaveCount(5);

  await expect(productList).toBeVisible();
});

Then('User adds {int} {string} to the cart', async ({page}, amount: number, productName: string) => {
  
  const productCard = page.locator('div.MuiCardContent-root.flex.flex-col.items-center.justify-between.h-full.css-15q2cw4').filter({ 
    hasText: productName 
  });

  const addToCartButton = productCard.locator('button.MuiButtonBase-root.MuiButton-root');

  await addToCartButton.click();

  if (amount > 1) {
    const plusButton = productCard.locator('button.MuiIconButton-root.MuiIconButton-sizeMedium').nth(1);

    for (let i = 1; i < amount; i++) {
      await plusButton.click();
    }
  }
});

Then('User goes to the cart page', async ({page}) => {
  
  const cartButton = page.locator(".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeMedium.css-ncs2kv");

  await cartButton.click();
});

Then('User verifies that the cart shows a total of {int} products and {int} items', async ({page}, productCount: number, itemsCount: number) => {
  
  const productList = page.locator('div.space-y-4');

  const productCards = productList.locator('> div');

  await expect(productCards).toHaveCount(productCount);


  const itemCount = await productCards.locator('div.space-x-2 > p.MuiTypography-root.MuiTypography-body1').allInnerTexts();

  const totalItems = itemCount.reduce((sum, text) => sum + parseInt(text, 10), 0);

  expect(totalItems).toBe(itemsCount);
});

Then('User verifies that the total cost in the cart is equal to {int}', async ({page, ctx}, totalSum: number) => {

  const totalCostLocator = page.locator('h6.MuiTypography-root.MuiTypography-h6.text-right.css-1imvwru');

  const totalCostText = await totalCostLocator.innerText();

  const parts = totalCostText.split('$');

  const actualTotal = Number(parts[1]);

  expect(actualTotal).toBe(totalSum);

  ctx.purchasePage.cartTotalCost = totalSum;
});

Then('User proceeds to add Address details for shipping', async ({page}) => {
  
  await page.locator('button:has-text("Proceed to Address")').click();
});

Then('User verifies that {string} button is disabled', async ({page}, buttonName: string) => {
  
  const proceedToPaymentButton = page.getByRole('button', { name: buttonName });
  await expect(proceedToPaymentButton).toBeDisabled();
});

Then('User enters {string}, {string}, {string} in the needed fields', async ({page, ctx}, firstName: string, lastName: string, street: string) => {

  await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Address' }).fill(street);

  ctx.purchasePage.username = firstName;
  ctx.purchasePage.surname = lastName;
  ctx.purchasePage.street = street;
});

Then('User verifies that {string} button is enabled and clicks it', async ({page}, buttonName: string) => {

  const proceedToPaymentButton = page.getByRole('button', { name: buttonName });
  await expect(proceedToPaymentButton).toBeEnabled();

  await proceedToPaymentButton.click();
});

Then('User selects {string} option', async ({page}, payNow: string) => {

  await page.getByRole('button', { name: payNow }).click();
});

Then('User verifies that the order confirmation page shows correct billing details and order summary', async ({page, ctx}) => {
  
  await expect(page.getByText(ctx.purchasePage.username + ' ' + ctx.purchasePage.surname, { exact: true })).toBeVisible();

  await expect(page.getByText(ctx.purchasePage.street, { exact: true })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Total Paid: $' + ctx.purchasePage.cartTotalCost })).toBeVisible();
});

Then('User verifies that {string} button navigates back to the product listing page', async ({page}, homeButtonName: string) => {
  
  await page.getByRole('button', { name: homeButtonName }).click();

  await page.waitForLoadState('networkidle');

  const productList = page.locator('div.flex.flex-wrap.gap-6.justify-center');

  await expect(productList).toBeVisible();
});