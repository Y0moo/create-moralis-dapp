import chalk from 'chalk';
import { execSync } from 'child_process';
// import fs from 'fs-extra';
import { join } from 'path';

const distPath = './dist/packages';

// const corePackages = ['toolkit', 'create-eth-dapp'];

// const packages = fs
//   .readdirSync(distPath)
//   .filter((pckg) => !corePackages.includes(pckg));

console.log(chalk.bold.cyan('🧙 : Linking dependencies'));

// packages.forEach((packageName) => {
const packageName = 'create-eth-dapp';
// const deps = join(
//   distPath,
//   packageName,
//   'node_modules',
//   '@create-moralis-dapp'
// );
// if (fs.existsSync(deps)) {
//   console.log(
//     chalk.bold.cyan(
//       `🧙 : Removing old @create-moralis-dapp/* dependencies for ${packageName}`
//     )
//   );
//   fs.removeSync(deps);
// }

console.log(chalk.bold.cyan(`🧙 : Installing dependencies for ${packageName}`));
execSync(`yarn install`, {
  cwd: join(distPath, packageName),
  stdio: 'inherit',
});
// });
