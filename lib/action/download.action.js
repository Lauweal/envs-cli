"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadAction = void 0;
const abstract_action_1 = require("./abstract.action");
class DownloadAction extends abstract_action_1.AbstractAction {
    handle(inputs, options, extraFlags) {
        throw new Error("Method not implemented.");
    }
}
exports.DownloadAction = DownloadAction;
