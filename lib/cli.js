"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const local_binaries_1 = require("./utils/local-binaries");
const command_1 = require("./command");
const bootstrap = () => {
    const program = commander;
    program
        .version(require('../package.json').version, '-v, --version', '输出当前版本.')
        .usage('<command> [options]')
        .helpOption('-h, --help', '帮助信息.');
    if ((0, local_binaries_1.localBinExists)()) {
        const localCommandLoader = (0, local_binaries_1.loadLocalBinCommandLoader)();
        localCommandLoader.load(program);
    }
    else {
        command_1.CommandLoader.load(program);
    }
    program.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
};
bootstrap();
