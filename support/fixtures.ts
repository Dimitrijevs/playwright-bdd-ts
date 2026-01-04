import { test as base, createBdd } from 'playwright-bdd';

type MyContext = {
    purchasePage?: {
      cartTotalCost?: number;
      username?: string;
      surname?:  string;
      streetName?: string;
    },
    socialMediaPost?: {
      authorUsername?: string;
      orderNumber?: number;
    },
    jobApplicationForm?: {
      salutation?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      mobileNumber?: string;
      gender?: string;
      knownLanguages?: string[];
      resumeFileName?: string;
      skills?: string[];
      jobRoles?: string[];
      selfRating?: number;
      availabilityDate?: string;
      availabilityTime?: string;
    }
};

export const test = base.extend<{ ctx: MyContext }>({
  ctx: async ({}, use) => {

    // This object is created fresh for EVERY scenario
    // do not effect performance by putting heavy setup code here
    const ctx: MyContext = {
      purchasePage: {},
      socialMediaPost: {},
      jobApplicationForm: {}
    }; 
    await use(ctx);
  },
});

export const { Given, When, Then } = createBdd(test);