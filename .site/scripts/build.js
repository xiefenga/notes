"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vuepress_1 = require("vuepress");
const config_1 = __importDefault(require("../config"));
const site_config_1 = __importDefault(require("../site.config"));
const onBuild = async () => {
    const { sourceDir } = site_config_1.default;
    await (0, vuepress_1.createBuild)(config_1.default)(sourceDir);
};
onBuild();
