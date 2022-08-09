import { readdirSync, renameSync, statSync } from 'fs-extra';
import { join, normalize } from 'path';

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
  const files = getAllFilesPathsInDir(destination);
  files.forEach((filePath) => {
    if (filePath.includes('.hbs')) {
      renameSync(filePath, filePath.replace('.hbs', ''));
    }
  });
};
normalizeTemplateFiles(normalize('E:/Work/NPM_LIBS_NAMES/testing/finale'));
