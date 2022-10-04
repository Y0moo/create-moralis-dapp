import { addDependenciesToPackageJson } from '@create-moralis-dapp/toolkit';
import { DependencyName, getVersionByName } from '../../../../utils';

export const addWeb3Lib = (name: DependencyName, destination: string) => {
  addDependenciesToPackageJson(destination, [
    {
      name,
      version: getVersionByName(name),
    },
    { name: 'ethers', version: getVersionByName('ethers') },
  ]);
};
