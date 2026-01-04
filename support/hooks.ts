import { BeforeAll, AfterAll, Before, After } from './fixtures';

BeforeAll(() => {
  console.log('🔷 [BeforeAll] Global setup');
});

AfterAll(() => {
  console.log('🔶 [AfterAll] Global teardown');
});

Before(() => {
  console.log('🟢 [Before] Each scenario');
});

After(() => {
  console.log('🔴 [After] Each scenario');
});