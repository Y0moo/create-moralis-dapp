"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPrettier = exports.addDependenciesToPackageJson = exports.installDepsWithPackageManager = exports.getPackageManagerInstallCmd = exports.execWithSpinner = exports.execAsync = exports.generateWithTemplate = exports.normalizeTemplateFiles = exports.getAllFilesPathsInDir = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var ejs_1 = require("ejs");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var versions_1 = require("./utils/versions");
var ora = require("ora");
var getAllFilesPathsInDir = function (parent) {
    var res = [];
    try {
        (0, fs_extra_1.readdirSync)(parent).forEach(function (c) {
            var child = (0, path_1.join)(parent, c);
            try {
                var s = (0, fs_extra_1.statSync)(child);
                if (!s.isDirectory()) {
                    res.push(child);
                }
                else if (s.isDirectory()) {
                    res = __spreadArray(__spreadArray([], res, true), (0, exports.getAllFilesPathsInDir)(child), true);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
    return res;
};
exports.getAllFilesPathsInDir = getAllFilesPathsInDir;
var normalizeTemplateFiles = function (destination, answers) { return __awaiter(void 0, void 0, void 0, function () {
    var filePaths;
    return __generator(this, function (_a) {
        filePaths = (0, exports.getAllFilesPathsInDir)(destination);
        filePaths.forEach(function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
            var newContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filePath.includes('.tmpl')) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, ejs_1.renderFile)(filePath, answers)];
                    case 1:
                        newContent = _a.sent();
                        (0, fs_1.writeFileSync)(filePath, newContent);
                        (0, fs_extra_1.renameSync)(filePath, filePath.replace('.tmpl', ''));
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.normalizeTemplateFiles = normalizeTemplateFiles;
var generateWithTemplate = function (templateDir, destination, answers) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fs_extra_1.copy)(templateDir, destination)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.normalizeTemplateFiles)(destination, answers)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.generateWithTemplate = generateWithTemplate;
var execAsync = function (command, cwd) {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(command, { cwd: cwd }, function (error, stdout) {
            if (error) {
                reject(error);
                return;
            }
            resolve({ code: 0, stdout: stdout });
        });
    });
};
exports.execAsync = execAsync;
var execWithSpinner = function (command, cwd, message) { return __awaiter(void 0, void 0, void 0, function () {
    var spinner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                spinner = ora(message).start();
                return [4 /*yield*/, (0, exports.execAsync)(command, cwd)
                        .then(function () { return spinner.succeed(); })
                        .catch(function (e) { return spinner.fail(e); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.execWithSpinner = execWithSpinner;
var getPackageManagerInstallCmd = function (packageManager) {
    switch (packageManager) {
        case 'yarn':
            return 'yarn add';
        case 'pnpm':
            return 'pnpm add';
        case 'npm':
        default:
            return 'npm install';
    }
};
exports.getPackageManagerInstallCmd = getPackageManagerInstallCmd;
var installDepsWithPackageManager = function (packageManager, destination) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.execWithSpinner)((0, exports.getPackageManagerInstallCmd)(packageManager), destination, "Installing dependencies via ".concat(packageManager))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.installDepsWithPackageManager = installDepsWithPackageManager;
var addDependenciesToPackageJson = function (destination, dependencies) {
    var packageJsonPath = (0, path_1.join)(destination, 'package.json');
    var packageJson = (0, fs_extra_1.readJsonSync)(packageJsonPath);
    dependencies.forEach(function (_a) {
        var name = _a.name, version = _a.version;
        packageJson.dependencies[name] = version;
    });
    (0, fs_extra_1.writeJsonSync)(packageJsonPath, packageJson, { spaces: 2 });
};
exports.addDependenciesToPackageJson = addDependenciesToPackageJson;
var addPrettier = function (destination) {
    (0, exports.addDependenciesToPackageJson)(destination, [
        { name: 'prettier', version: versions_1.versions.prettier },
    ]);
    var packageJsonPath = (0, path_1.join)(destination, 'package.json');
    var packageJson = (0, fs_extra_1.readJsonSync)(packageJsonPath);
    var scriptsToAdd = [
        { name: 'format', script: 'yarn prettier . "**/*.+(js|ts|json)" --write' },
        {
            name: 'format:check',
            script: 'yarn prettier . "**/*.+(js|ts|json)" --check',
        },
    ];
    scriptsToAdd.forEach(function (_a) {
        var name = _a.name, script = _a.script;
        packageJson.scripts[name] = script;
    });
    (0, fs_extra_1.writeJsonSync)(packageJsonPath, packageJson, { spaces: 2 });
};
exports.addPrettier = addPrettier;
//# sourceMappingURL=index.js.map