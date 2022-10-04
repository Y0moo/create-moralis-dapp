import { Answers, prompt } from 'inquirer';
import { join } from 'path';
import {
  addPrettier,
  execAsync,
  execWithSpinner,
  generateWithTemplate,
} from '@create-moralis-dapp/toolkit';
import * as ora from 'ora';
import { web3LibSchema } from './actions/addWeb3Lib/web3LibSchema';
import { addWeb3Lib } from './actions/addWeb3Lib';

export const questions = [
  {
    type: 'list',
    name: 'web3Lib',
    message: '🧙 : Select a Web3 library ...',
    choices: [
      { name: 'wagmi', value: web3LibSchema.wagmi },
      { name: 'useDapp', value: web3LibSchema.useDapp },
      { name: 'web3-react', value: web3LibSchema.web3React },
    ],
  },
  //   {
  //     type: 'list',
  //     name: 'style',
  //     message: '🧙 : Select a styling system ... (soon)',
  //     choices: [
  //       { name: 'CSS (coming soon)', value: 'CSS' },
  //       { name: 'styled-components (coming soon)', value: 'styled-components' },
  //       { name: 'styled-jsx (coming soon)', value: 'styled-jsx' },
  //     ],
  //   },
  {
    type: 'input',
    name: 'name',
    message: '🧙 : What name would you like to use for your new project? ...',
  },
];

export const baseGenerator = async () => {
  const answers: Answers = await prompt(questions);

  const templateDir = join(__dirname, './template');
  const destination = join(process.cwd(), answers['name']);

  try {
    await generateWithTemplate(templateDir, destination, answers);

    addWeb3Lib(answers['web3Lib']['name'], destination);

    addPrettier(destination);

    await execWithSpinner(
      'yarn install',
      destination,
      'Installing dependencies via yarn'
    );

    await execWithSpinner(
      'npm run format',
      destination,
      'Running prettier format'
    );

    console.log(
      `The ${answers['name']} project created successfully\nProject path: ${destination}`
    );
  } catch (e) {
    console.error(e);
  }
};
