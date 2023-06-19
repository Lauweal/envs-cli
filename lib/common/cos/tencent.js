"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TencentCos = void 0;
const COS = require("cos-nodejs-sdk-v5");
const abstract_cos_1 = require("./abstract.cos");
const fs_1 = require("fs");
class TencentCos extends abstract_cos_1.AbstractCos {
    constructor(id, key, region, bucket) {
        super(id, key, region, bucket);
        this.id = id;
        this.key = key;
        this.region = region;
        this.bucket = bucket;
        this.client = new COS({
            SecretId: this.id,
            SecretKey: this.key,
        });
    }
    getFiles(dir) {
        const _dir = dir.startsWith('/') ? dir.split('/').filter(Boolean).join('/') : dir;
        return new Promise((resolve) => {
            this.client.getBucket({
                Bucket: this.bucket,
                Region: this.region,
                Prefix: _dir
            }, function (err, data) {
                if (err) {
                    return resolve([]);
                }
                else {
                    return resolve(data.Contents.map(item => item.Key));
                }
            });
        });
    }
    uploadRemoteFile(local, remote) {
        return new Promise((resolve, reject) => {
            this.client.putObject({
                Bucket: this.bucket,
                Region: this.region,
                Key: remote,
                StorageClass: 'STANDARD',
                Body: (0, fs_1.createReadStream)(local)
            }, function (err, data) {
                if (err) {
                    return resolve(false);
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
    deleteRemoteFile(name) {
        return new Promise((resolve, reject) => {
            this.client.deleteObject({
                Bucket: this.bucket,
                Region: this.region,
                Key: name
            }, function (err, data) {
                if (err) {
                    return resolve(false);
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
    dowloadRemoteFile(local, remote) {
        console.log(remote);
        return new Promise((resolve, reject) => {
            this.client.getObject({
                Bucket: this.bucket,
                Region: this.region,
                Key: remote,
                Output: (0, fs_1.createWriteStream)(local, {
                    flags: 'w'
                })
            }, function (err, data) {
                if (err) {
                    return resolve(false);
                }
                else {
                    return resolve(true);
                }
            });
        });
    }
}
exports.TencentCos = TencentCos;
