import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

import dotenv from 'dotenv'; 
dotenv.config();  // Load environment variables from .env file 

const testDir = defineBddConfig({
  features: 'feature/**/*.feature',

  steps: ['steps/**/*.ts', 'support/fixtures.ts', 'support/hooks.ts'],
});

export default defineConfig({
  testDir,

  retries: process.env.RETRIES ? parseInt(process.env.RETRIES, 10) : 0,
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS, 10) : 1,

  use: {

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  
  reporter: [
    ['list'],

    ['html', { 
      outputFolder: 'reports/html',
      open: 'never' 
    }],

    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ]
});
