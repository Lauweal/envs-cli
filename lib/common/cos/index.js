"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COS = exports.CosType = void 0;
const ali_1 = require("./ali");
const tencent_1 = require("./tencent");
var CosType;
(function (CosType) {
    CosType[CosType["Tencent"] = 0] = "Tencent";
    CosType[CosType["Ali"] = 1] = "Ali";
})(CosType = exports.CosType || (exports.CosType = {}));
class COS {
    static create(type, options) {
        switch (type) {
            case CosType.Tencent:
                return new tencent_1.TencentCos(options.id, options.key, options.region, options.bucket);
                break;
            default:
                return new ali_1.AliCos(options.id, options.key, options.region, options.bucket);
                break;
        }
    }
}
exports.COS = COS;
