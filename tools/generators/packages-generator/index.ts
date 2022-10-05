import {
  Tree,
  formatFiles,
  installPackagesTask,
  joinPathFragments,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import * as fs from 'fs-extra';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, {
    name: schema.name,
    buildable: true,
  });

  fs.copySync(
    joinPathFragments(__dirname, './files'),
    joinPathFragments('packages', schema.name)
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
