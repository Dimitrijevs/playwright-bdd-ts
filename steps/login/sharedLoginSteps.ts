import { createBdd } from "playwright-bdd";

const { When } = createBdd();

When(
  "User enters {string} and {string}",
  async ({ page }, username: string, password: string) => {
    const usernameField = page.getByRole("textbox", { name: "Username" });
    const passwordField = page.getByRole("textbox", { name: "Password" });

    await usernameField.pressSequentially(username, { delay: 200 });
    await passwordField.pressSequentially(password, { delay: 200 });
  }
);