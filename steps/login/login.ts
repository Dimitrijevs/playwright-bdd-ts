import { expect } from "@playwright/test";
import { log } from "console";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

When("User clicks on the login button", async ({ page }) => {
  const loginButton = page.getByRole("button", { name: "Login" });

  await loginButton.click();
});

Then("User should see {string} based title", async ({ page }, role: string) => {
  await page.waitForLoadState("networkidle");

  const welcomeMessage = page.locator(
    "div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.text-center > div.MuiAlert-message.css-127h8j3"
  );

  await expect(welcomeMessage).toHaveText(
    "You are logged in as " + role.toUpperCase()
  );
});

When("User press the logout button", async ({ page }) => {
    const logoutButton = page.getByRole('button', { name: 'Logout' });

    await logoutButton.click();

    await page.waitForLoadState("networkidle");

    expect(logoutButton).not.toBeVisible();
});

Then("User should not see welcome message", async ({ page }) => {
  const welcomeMessage = page.locator(
    "div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiAlert-root.text-center > div.MuiAlert-message.css-127h8j3"
  );

  await expect(welcomeMessage).toHaveCount(0);
});
