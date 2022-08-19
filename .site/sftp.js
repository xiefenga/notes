"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const sftp = new ssh2_sftp_client_1.default();
const config = {
    host: 'xiefeng.tech',
    port: 22,
    username: 'root',
    password: 'xf.1314.X'
};
sftp.connect(config)
    .then(() => sftp.list('/'))
    .then(data => data.forEach(item => console.log(item.name)))
    .catch(err => {
    console.log(err, 'catch error');
}).then(() => sftp.end());
