import { Answers, prompt } from 'inquirer';
import { join } from 'path';
import {
  generateWithTemplate,
  installDepsWithPackageManager,
} from '@create-moralis-dapp/toolkit';

export const questions = [
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

    await installDepsWithPackageManager(answers.packageManager, destination);

    console.log(
      `The ${answers['name']} project created successfully\nProject path: ${destination}`
    );
  } catch (e) {
    console.error(e);
  }
};
