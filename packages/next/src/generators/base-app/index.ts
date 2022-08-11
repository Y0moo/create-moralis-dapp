import { copy } from 'fs-extra';
import { join } from 'path';
import { prompt } from 'inquirer';
import {
  generateWithTemplate,
  normalizeTemplateFiles,
} from '@create-moralis-dapp/toolkit';

export const questions = [
  {
    type: 'list',
    name: 'web3Lib',
    message: '🧙 : Select a web3 library ... (soon)',
    choices: ['wagmi', 'useDapp', 'web3-react'],
  },
  {
    type: 'list',
    name: 'style',
    message: '🧙 : Select a styling system ... (soon)',
    choices: [
      { name: 'CSS (coming soon)', value: 'CSS' },
      { name: 'styled-components (coming soon)', value: 'styled-components' },
      { name: 'styled-jsx (coming soon)', value: 'styled-jsx' },
    ],
  },
  {
    type: 'input',
    name: 'name',
    message: '🧙 : What name would you like to use for your new project? ...',
  },
];

export const baseAppGenerator = async () => {
  const { web3Lib, style, name }: Record<string, string> = await prompt(
    questions
  );

  const templateDir = join(__dirname, './template');
  const destination = join(process.cwd(), name);

  try {
    // await copy(templateDir, destination);
    // normalizeTemplateFiles(destination);
    await generateWithTemplate(templateDir, destination);
  } catch (e) {
    throw new Error(e);
  }

  console.log(
    `The ${name} project created successfully\nProject path: ${destination}`
  );
};
