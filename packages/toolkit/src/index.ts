import { copy, readdirSync, renameSync, statSync } from 'fs-extra';
import { join } from 'path';
import { renderFile } from 'ejs';
import { writeFileSync } from 'fs';
import type { Answers } from 'inquirer';

export const getAllFilesPathsInDir = (parent: string): string[] => {
  let res: string[] = [];
  try {
    readdirSync(parent).forEach((c) => {
      const child = join(parent, c);
      try {
        const s = statSync(child);
        if (!s.isDirectory()) {
          res.push(child);
        } else if (s.isDirectory()) {
          res = [...res, ...getAllFilesPathsInDir(child)];
        }
      } catch (e) {
        throw new Error(e);
      }
    });
  } catch (e) {
    throw new Error(e);
  }
  return res;
};

export const normalizeTemplateFiles = async (
  destination: string,
  answers: Answers
) => {
  const filePaths = getAllFilesPathsInDir(destination);
  filePaths.forEach(async (filePath) => {
    if (filePath.includes('.tmpl')) {
      const newContent = await renderFile(filePath, answers);
      writeFileSync(filePath, newContent);
      renameSync(filePath, filePath.replace('.tmpl', ''));
    }
  });
};

export const generateWithTemplate = async (
  templateDir: string,
  destination: string,
  answers: Answers
) => {
  await copy(templateDir, destination);
  await normalizeTemplateFiles(destination, answers);

  // normalizeTemplateFiles(string);
};
// normalizeTemplateFiles(normalize('E:/Work/NPM_LIBS_NAMES/testing/finale'));
