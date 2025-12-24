import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then(
  "User enters valid {string} and {string}",
  async ({ page }, username: string, password: string) => {
    const usernameField = page.getByRole("textbox", { name: "Username" });
    const passwordField = page.getByRole("textbox", { name: "Password" });

    await usernameField.pressSequentially(username, { delay: 300 });
    await passwordField.pressSequentially(password, { delay: 300 });
  }
);

Then("User clicks on the login button", async ({ page }) => {
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
