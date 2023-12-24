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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCos = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../../ui/logger");
class AbstractCos {
    constructor(id, key, region, bucket) {
        this.id = id;
        this.key = key;
        this.region = region;
        this.bucket = bucket;
    }
    isFile(filepath) {
        const _paths = filepath.split('/');
        return _paths[_paths.length - 1].includes('.');
    }
    isDirectory(filepath) {
        return (0, fs_1.statSync)(filepath).isDirectory();
    }
    filepath(name) {
        return name.split('/').filter(Boolean).join('/');
    }
    mkdir(name) {
        let dir = name;
        if (this.isFile(name)) {
            let filepath = name.split('/');
            dir = filepath.splice(0, filepath.length - 1).join('/');
            dir = dir.startsWith('/') ? dir : `/${dir}`;
        }
        if (!(0, fs_1.existsSync)(dir)) {
            (0, fs_1.mkdirSync)(dir, { recursive: true });
        }
    }
    walk(name, callback) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFile(name)) {
                return yield callback(name);
            }
            const dir = yield fs_1.promises.opendir(name);
            try {
                for (var _d = true, dir_1 = __asyncValues(dir), dir_1_1; dir_1_1 = yield dir_1.next(), _a = dir_1_1.done, !_a;) {
                    _c = dir_1_1.value;
                    _d = false;
                    try {
                        const item = _c;
                        yield this.walk((0, path_1.join)(name, item.name), callback);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = dir_1.return)) yield _b.call(dir_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    walkRemote(name, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFile(name)) {
                return yield callback(name);
            }
            const files = yield this.getFiles(name);
            return yield Promise.all(files.map(c => this.walkRemote(c, callback)));
        });
    }
    collectLocalFiles(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = new Set();
            yield this.walk(name, path => {
                if (this.isFile(name)) {
                    const paths = path.split('/');
                    files.add(paths[paths.length - 1]);
                }
                else {
                    files.add(path.replace(name, ''));
                }
            });
            return files;
        });
    }
    collectRemoteFiles(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = new Set();
            yield this.walkRemote(name, path => {
                const _name = name.split('/').filter(Boolean).join('/');
                files.add(path.replace(_name, ''));
            });
            return files;
        });
    }
    findDeletedFiles(local, remote) {
        const deletedFiles = new Set();
        for (const file of remote) {
            if (local.has(file)) {
                deletedFiles.add(file);
            }
        }
        return deletedFiles;
    }
    deleteLocalFile(name) {
        return (0, fs_1.unlinkSync)(name);
    }
    cleanRemoteFiles(remote, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = files.size;
            let index = 0;
            let percent = 0;
            for (const file of files) {
                let name = (0, path_1.join)(remote, file);
                const status = yield this.deleteRemoteFile(name);
                index++;
                percent = parseInt(((index / size) * 100));
                if (status) {
                    logger_1.Logger.info(`[${index}/${size}, ${percent}%] cleaned remote: ${name}`);
                }
                else {
                    logger_1.Logger.wran(`[${index}/${size}, ${percent}%] cleaned remote: ${name}`);
                }
            }
        });
    }
    cleanLocalFiles(local, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = files.size;
            let index = 0;
            let percent = 0;
            for (const file of files) {
                const name = (0, path_1.join)(local, file);
                this.deleteLocalFile(name);
                index++;
                percent = parseInt(((index / size) * 100));
                logger_1.Logger.info(`[${index}/${size}, ${percent}%] cleaned local: ${name}`);
            }
        });
    }
    uploadFiles(local, remote, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = files.size;
            let index = 0;
            let percent = 0;
            let paths = [];
            for (const file of files) {
                const localFile = (0, path_1.join)(local, file);
                const remoteFile = (0, path_1.join)(remote, file);
                const status = yield this.uploadRemoteFile(localFile, remoteFile);
                index++;
                percent = parseInt(((index / size) * 100));
                if (status) {
                    logger_1.Logger.info(`[${index}/${size}, ${percent}%] upload remote: ${remoteFile}`);
                }
                else {
                    logger_1.Logger.wran(`[${index}/${size}, ${percent}%] upload remote: ${remoteFile}`);
                    paths.push(file);
                }
            }
            return paths;
        });
    }
    dowloadFiles(local, remote, files) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = files.size;
            let index = 0;
            let percent = 0;
            let paths = [];
            for (const file of files) {
                const localFile = (0, path_1.join)(local, file);
                const remoteFile = (0, path_1.join)(remote, file);
                const status = yield this.dowloadRemoteFile(localFile, remoteFile);
                index++;
                percent = parseInt(((index / size) * 100));
                if (status) {
                    logger_1.Logger.info(`[${index}/${size}, ${percent}%] dowload remote: ${remoteFile}`);
                }
                else {
                    logger_1.Logger.wran(`[${index}/${size}, ${percent}%] dowload remote: ${remoteFile}`);
                    paths.push(file);
                }
            }
            return paths;
        });
    }
    path(local) {
        const _paths = local.split('/').filter(Boolean);
        if (this.isFile(local)) {
            return local.replace(_paths[_paths.length - 1], '');
        }
        return local;
    }
    upload(local, remote) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.info(`[COS] 开始上传${local} -> ${remote}`);
            const localPath = this.path(local);
            const remotePath = this.path(remote);
            const localFiles = yield this.collectLocalFiles(local);
            const remoteFiles = yield this.collectRemoteFiles(remote);
            const deleteFiles = this.findDeletedFiles(localFiles, remoteFiles);
            if (deleteFiles.size > 0) {
                yield this.cleanRemoteFiles(remotePath, deleteFiles);
            }
            const files = yield this.uploadFiles(localPath, remotePath, localFiles);
            if (files.length)
                logger_1.Logger.wran(`以下文件上传失败:\n${files.join('\n')}`);
            return !files.length;
        });
    }
    uploads(assets) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(assets.map(a => this.upload(a.local, a.remote))).then((val) => val.every(i => !!i));
        });
    }
    dowload(local, remote) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Logger.info(`[COS] 开始下载${remote} -> ${local}`);
            const remoteFiles = yield this.collectRemoteFiles(remote);
            this.mkdir(local);
            const localFiles = yield this.collectLocalFiles(local);
            const deleteFiles = this.findDeletedFiles(remoteFiles, localFiles);
            if (deleteFiles.size > 0) {
                this.cleanLocalFiles(local, deleteFiles);
            }
            const files = yield this.dowloadFiles(local, remote, remoteFiles);
            if (files.length)
                logger_1.Logger.wran(`以下文件下载失败:\n${files.join('\n')}`);
            return !files.length;
        });
    }
    dowloads(assets) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(assets.map(a => this.dowload(a.local, a.remote))).then((val) => val.every(i => !!i));
        });
    }
}
exports.AbstractCos = AbstractCos;
