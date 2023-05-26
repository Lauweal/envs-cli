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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliCos = void 0;
const abstract_cos_1 = require("./abstract.cos");
const COS = require("ali-oss");
class AliCos extends abstract_cos_1.AbstractCos {
    constructor(id, key, region, bucket) {
        super(id, key, region, bucket);
        this.id = id;
        this.key = key;
        this.region = region;
        this.bucket = bucket;
        this.client = new COS({
            region: this.region,
            accessKeyId: this.id,
            accessKeySecret: this.key,
            bucket: this.bucket
        });
    }
    getFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.list({
                prefix: dir
            });
        });
    }
    deleteRemoteFile(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.delete(name);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    uploadRemoteFile(local, remote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.put(remote, local);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    dowloadRemoteFile(local, remote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.get(remote, local);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.AliCos = AliCos;
