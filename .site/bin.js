#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const vuepress_1 = require("vuepress");
const config_1 = __importDefault(require("./config"));
const site_config_1 = __importDefault(require("./site.config"));
const PKG = module.require('./package.json');
const onBuild = async (path) => {
    const { sourceDir } = site_config_1.default;
    await (0, vuepress_1.createBuild)(config_1.default)(sourceDir);
};
const onDev = async (path) => {
    const { sourceDir } = site_config_1.default;
    await (0, vuepress_1.createDev)(config_1.default)(sourceDir);
};
const onPublish = async () => {
};
commander_1.program
    .version(PKG.version, '-v');
commander_1.program
    .command('build [path]')
    .action(onBuild)
    .description('build the source file');
commander_1.program
    .command('dev [path]')
    .action(onDev)
    .description('run dev server to debug');
commander_1.program
    .command('publish')
    .action(onPublish)
    .description('publish the dist to server');
commander_1.program.parse();
