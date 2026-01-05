import { expect } from '@playwright/test';
import { Given, When, Then } from "../support/fixtures";

Then('User verifies that the {int} post contains an profile image, username, post image, like button, like count', async ({page, ctx}, postNumber: number) => {
  
    await page.waitForLoadState('networkidle');

    const postThread = page.locator('div.flex.flex-col.space-y-6.w-full.max-w-md');

    const post = postThread.locator('> div').nth(postNumber);

    const username = post.getByRole('heading', { level: 6 });

    await expect(post.locator('img.MuiAvatar-img.css-45do71')).toBeVisible();
    await expect(username).toBeVisible();
    await expect(post.locator('img.object-cover')).toBeVisible();
    await expect(post.locator('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium')).toBeVisible();
    await expect(post.locator('p.MuiTypography-root.MuiTypography-body1')).toBeVisible();

    ctx.socialMediaPost!.authorUsername = await username.innerText();
    ctx.socialMediaPost!.orderNumber = postNumber;
});

When('User {word}s the post, verifies that the like count changes by {int}', async ({page, ctx}, action: string, oneLike: number) => {

    const postThread = page.locator('div.flex.flex-col.space-y-6.w-full.max-w-md');
    const post = postThread.locator('> div').nth(ctx.socialMediaPost!.orderNumber!);

    const likeCount = post.locator('p.MuiTypography-root.MuiTypography-body1').innerText();

    const likeButton = post.locator('button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium');
    await likeButton.click();

    const updatedLikeCount = post.locator('p.MuiTypography-root.MuiTypography-body1').innerText();
    
    const initialCount = parseInt(await likeCount);
    const newCount = parseInt(await updatedLikeCount);

    if (action === 'like') {
        expect(newCount).toBe(initialCount + oneLike);
    } else if (action === 'unlike') {
        expect(newCount).toBe(initialCount - oneLike);
    } else {
        throw new Error(`Unknown action: ${action}`);
    }
});

Then('User verifies that notification recieved about successful {word}', async ({page, ctx}, action: string) => {

    const notificationButton = page.locator("div[class='w-full flex justify-end pr-6'] button[type='button']");
    await notificationButton.click();

    const notificationMessage = page.getByText(`You ${action}d ${ctx.socialMediaPost!.authorUsername}'s post`, { exact: true });
    await expect(notificationMessage).toBeVisible();

    await page.mouse.click(0, 0);
});