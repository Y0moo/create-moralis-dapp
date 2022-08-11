import chalk from 'chalk';
import { execSync } from 'child_process';
import { readdirSync } from 'fs';

const distPath = './dist/packages';

const packages = readdirSync(distPath);

console.log(chalk.bold.cyan('🧙 : Linking dependencies'));

packages.forEach((packageName) => {
  console.log(
    chalk.bold.cyan(`🧙 : Installing dependencies for ${packageName}`)
  );
  execSync(`yarn install`, {
    cwd: `${distPath}/${packageName}`,
  });
});