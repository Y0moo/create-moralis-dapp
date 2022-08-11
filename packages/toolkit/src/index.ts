import { copy, readdirSync, renameSync, statSync } from 'fs-extra';
import { join, normalize } from 'path';
import { renderFile } from 'ejs';
import { writeFile } from 'fs';

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

export const normalizeTemplateFiles = (destination: string) => {
  const filePaths = getAllFilesPathsInDir(destination);
  filePaths.forEach((filePath) => {
    if (filePath.includes('.hbs')) {
      const newContent = renderFile(filePath, { name: 'kek' });
      writeFile(filePath, newContent);
      // console.log('newContent: ', newContent);
      // renameSync(filePath, filePath.replace('.hbs', ''));
    }
  });
};

export const generateWithTemplate = async (
  templateDir: string,
  destination: string
) => {
  await copy(templateDir, destination);
  await normalizeTemplateFiles(destination);

  // normalizeTemplateFiles(string);
};
// normalizeTemplateFiles(normalize('E:/Work/NPM_LIBS_NAMES/testing/finale'));
