import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'feature/**/*.feature',

  steps: ['steps/**/*.ts', 'support/fixtures.ts', 'support/hooks.ts'],
});

export default defineConfig({
  testDir,
  
  reporter: [
    ['list'],

    ['html', { 
      outputFolder: 'reports/html',
      open: 'never' 
    }],

    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ]
});
