import monorepoPackage from '../../../../package.json';
import uiPackage from '../../../../packages/ui/package.json';

export const environment = {
  production: false,
  mockUser: true,
  appVersion: monorepoPackage.version,
  libraryVersion: uiPackage.version,
  apiUrl: 'http://localhost:5000',
  githubRepoUrl: 'https://github.com/damianlaczynski/Ui/',
};
