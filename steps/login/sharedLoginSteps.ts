import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();

Then(
  "User enters {string} and {string}",
  async ({ page }, username: string, password: string) => {
    const usernameField = page.getByRole("textbox", { name: "Username" });
    const passwordField = page.getByRole("textbox", { name: "Password" });

    await usernameField.pressSequentially(username, { delay: 300 });
    await passwordField.pressSequentially(password, { delay: 300 });
  }
);