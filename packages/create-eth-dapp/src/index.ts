#!/usr/bin/env node
import {
  readdir,
  copy,
  createWriteStream,
  readFileSync,
  writeFile,
} from 'fs-extra';
import { join } from 'path';
import { prompt } from 'inquirer';
import { promisify } from 'util';
// import gitignore from 'gitignore';
// import { projectInstall } from 'pkg-install';
// import { bold, yellow } from 'chalk';
import {
  baseAppGenerator as nextAppGenerator,
  componentGenerator,
} from '@create-moralis-dapp/next';
// import { testHi } from '@create-moralis-dapp/toolkit';
// const wgitignore = promisify(gitignore.writeFile);

const questions = [
  {
    type: 'list',
    name: 'template',
    message: '🧙 : Select a template for your application ...',
    choices: [
      {
        name: 'parse-server         [only backend]',
        value: 'parse-server',
      },
      {
        name: 'nextjs               [only frontend]',
        value: 'nextjs',
      },
    ],
  },
  // {
  //   type: 'list',
  //   name: 'web3Lib',
  //   message: '🧙 : Select a web3 library ...',
  //   choices: ['wagmi', 'useDapp', 'web3-react'],
  //   when: (response: { template: string }) => response.template === 'nextjs',
  // },
];

async function main() {
  // const targetDir = process.argv[2] || process.cwd();
  // const destination = join(process.cwd(), targetDir);

  // const templatesDir = join(__dirname, './templates');
  // console.log('templatesDir: ', templatesDir);
  const { template }: Record<string, string> = await prompt(questions);
  // const templateDir = join(templatesDir, template);
  // const destination = join(process.cwd(), name);
  // console.log('🧙 : Creating a new project');

  await nextAppGenerator();
  // wgitignore({
  //   type: 'Node',
  //   file: createWriteStream(join(destination, '.gitignore'), { flags: 'a' }),
  // });
  // await projectInstall({ cwd: destination });
  // const targetpkg = join(destination, 'package.json');
  // const contents = JSON.parse(readFileSync(targetpkg).toString());
  // contents.name = destination;
  // await writeFile(targetpkg, JSON.stringify(contents, null, 2));
 
}
main();
