"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLocalBinCommandLoader = exports.localBinExists = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const localBinPathSegments = [process.cwd(), 'node_modules', 'envs-cli'];
function localBinExists() {
    return (0, fs_1.existsSync)((0, path_1.join)(...localBinPathSegments));
}
exports.localBinExists = localBinExists;
function loadLocalBinCommandLoader() {
    const commandsFile = require(path_1.posix.join(...localBinPathSegments, 'build', 'commands'));
    return commandsFile.CommandLoader;
}
exports.loadLocalBinCommandLoader = loadLocalBinCommandLoader;
