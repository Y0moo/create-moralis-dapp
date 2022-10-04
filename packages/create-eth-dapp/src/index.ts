#!/usr/bin/env node
import { prompt } from 'inquirer';
import { baseAppGenerator as nextAppGenerator } from '@create-moralis-dapp/next';
import { baseGenerator as reactAppGenerator } from '@create-moralis-dapp/react';

const questions = [
  {
    type: 'list',
    name: 'template',
    message: '🧙 : Select a template for your application ...',
    choices: [
      // {
      //   name: 'parse-server         [only backend]',
      //   value: 'parse-server',
      // },
      {
        name: 'nextjs              [only frontend]',
        value: 'nextjs',
      },
      {
        name: 'react               [with a choice of available backends]',
        value: 'react',
      },
    ],
  },
  // {
  //   type: 'checkbox',
  //   name: 'checkboxTest',
  //   message: '🧙 : checkboxTest ...',
  //   choices: ['one', 'two'],
  // },
];

async function main() {
  const { template }: Record<string, string> = await prompt(questions);

  switch (template) {
    case 'react':
      return await reactAppGenerator();
    case 'nextjs':
      return await nextAppGenerator();
    default:
      throw new Error('No Template Found');
  }
}
main();
