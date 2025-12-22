type Locators = {
    [key: string]: any;
}

const locators: Locators = {
    webApp: {
        link: 'https://www.cnarios.com/',
        appLogo: "div[class='MuiBox-root css-v20fs0'] a",
    },

    welcomePage: {
        welcomeMessage: 'h1:has-text("Practice Automation Testing the Way It Happens in the Real World")',
        startExploringButton: ':text-is("Start Exploring")',
        challengesButton: 'button.MuiButtonBase-root.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.MuiButton-root.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeMedium.MuiButton-outlinedSizeMedium.MuiButton-colorPrimary.css-1oypj7l',

        featuresSection: "//div[@class='grid gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3']",

        stepsSectionTitle: "div[id='how-it-works'] p[class='MuiTypography-root MuiTypography-body1 css-ifohs8']",
        stepsSection: 'div.flex.flex-col.gap-20.md\\:gap-28.px-4.md\\:px-20',
        stepsSectionItems: {
            stepNumber: '> div > div.flex.items-center > span.rounded-full',
            stepTitle: '> div > div.flex.flex-col > p.css-crrd50',
            stepDescription: '> div > div.flex.flex-col > p.css-1segk83',
            stepImage: '> div.flex.justify-center > img',
        },

        motivationalSectionTitle: 'h4.MuiTypography-root.MuiTypography-h4.MuiTypography-gutterBottom.css-w3oyx3',
        motivationalSectionParagraph: 'p.MuiTypography-root.MuiTypography-body1.css-1oe4aw5',
        
        footerLogo: "//div[@class='flex justify-center md:justify-start']//a",
        footerTopicsSection: 'div.flex.flex-col.sm\\:flex-row.flex-wrap.gap-8.text-sm',
        footerLinksSection: 'div.flex.justify-center.md\\:justify-end'

    },

    productListingAndPaginationPage: {
        link: "//body//div[@id='root']//div//div[1]//div[2]//button[1]",

        productsList: 'div.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4.gap-6.w-full.max-w-6xl'
        
    },
};

export { locators };