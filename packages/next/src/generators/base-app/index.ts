import { join } from 'path';
import { Answers, prompt } from 'inquirer';
import { generateWithTemplate } from '@create-moralis-dapp/toolkit';
import { web3LibSchema } from './web3Lib';

export const questions = [
  {
    type: 'list',
    name: 'web3Lib',
    message: '🧙 : Select a web3 library ... (soon)',
    choices: [
      { name: 'wagmi', value: web3LibSchema.wagmi },
      { name: 'useDapp', value: web3LibSchema.useDapp },
      { name: 'web3-react', value: web3LibSchema['web3-react'] },
    ],
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
  const answers: Answers = await prompt(questions);

  const templateDir = join(__dirname, './template');
  const destination = join(process.cwd(), answers.name);

  try {
    await generateWithTemplate(templateDir, destination, answers);
  } catch (e) {
    throw new Error(e);
  }

  console.log(
    `The ${answers.name} project created successfully\nProject path: ${destination}`
  );
};
