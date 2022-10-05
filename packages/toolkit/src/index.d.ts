import type { Answers } from 'inquirer';
export declare const getAllFilesPathsInDir: (parent: string) => string[];
export declare const normalizeTemplateFiles: (destination: string, answers: Answers) => Promise<void>;
export declare const generateWithTemplate: (templateDir: string, destination: string, answers: Answers) => Promise<void>;
export declare const execAsync: (command: string, cwd: string) => Promise<unknown>;
export declare const execWithSpinner: (command: string, cwd: string, message: string) => Promise<void>;
export declare type Dependency = {
    name: string;
    version: string;
};
export declare type PackageManager = 'yarn' | 'npm' | 'pnpm';
export declare const getPackageManagerInstallCmd: (packageManager: PackageManager) => "yarn add" | "pnpm add" | "npm install";
export declare const installDepsWithPackageManager: (packageManager: PackageManager, destination: string) => Promise<void>;
export declare const addDependenciesToPackageJson: (destination: string, dependencies: Dependency[]) => void;
export declare const addPrettier: (destination: string) => void;
