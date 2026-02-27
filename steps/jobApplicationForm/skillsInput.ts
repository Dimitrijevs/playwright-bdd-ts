import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { When, Then } = createBdd();

When(
  "User adds the following skills: {string}",
  async ({ page }, skillString: string) => {
    // skills
    const skills = skillString.split(",").map((skill) => skill.trim());

    const input = page.locator(
      "div.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.css-1syh60j input",
    );
    for (const skill of skills) {

      await page.waitForTimeout(200);
      await input.pressSequentially(skill, { delay: 200 });
      
      await page.waitForTimeout(200);
      await input.press("Enter");
    }
  },
);

Then(
  "The skills list shows: {string}",
  async ({ page }, expectedSkills: string) => {
    const expectedSkillsArray = expectedSkills
      .split(",")
      .map((skill) => skill.trim());

    const skillsListLocator = page.locator(
      "div.MuiBox-root.css-e5z02e .MuiChip-label",
    );

    const skillInnerTexts = await skillsListLocator.allInnerTexts();

    expect(skillInnerTexts).toEqual(expectedSkillsArray);
  },
);

When(
  "User removes the skill {string}",
  async ({ page }, removedSkill: string) => {
    const removedSkillLocator = page
      .locator("div.MuiBox-root.css-e5z02e > div")
      .filter({ hasText: removedSkill });

    await removedSkillLocator.locator("svg.MuiChip-deleteIcon").click();
  },
);

Then(
  "The skill {string} is no longer displayed",
  async ({ page }, removedSkill: string) => {
    const removedSkillLocator = page
      .locator("div.MuiBox-root.css-e5z02e")
      .filter({ hasText: removedSkill });

    await expect(removedSkillLocator).not.toBeVisible();
  },
);
