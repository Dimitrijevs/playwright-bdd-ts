import { test as base, createBdd } from 'playwright-bdd';

type MyContext = {
    purchasePage?: {
      cartTotalCost?: number;
      username?: string;
      surname?:  string;
      streetName?: string;
    };
};

export const test = base.extend<{ ctx: MyContext }>({
  ctx: async ({}, use) => {

    // This object is created fresh for EVERY scenario
    // do not effect performance by putting heavy setup code here
    const ctx: MyContext = {
      purchasePage: {}
    }; 
    await use(ctx);
  },
});

export const { Given, When, Then } = createBdd(test);