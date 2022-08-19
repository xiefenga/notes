"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const vuepress_1 = require("vuepress");
const bundler_vite_1 = require("@vuepress/bundler-vite");
const plugin_search_1 = require("@vuepress/plugin-search");
const vuepress_plugin_index_1 = __importDefault(require("./theme/pulgins/vuepress-plugin-index"));
const vuepress_plugin_title_1 = __importDefault(require("./theme/pulgins/vuepress-plugin-title"));
const theme_1 = require("./theme");
const theme = (0, theme_1.localTheme)();
const bundler = (0, bundler_vite_1.viteBundler)();
const sitePage = {
    title: '个人笔记',
    lang: 'zh-CN',
    description: '',
};
const plugins = [
    (0, plugin_search_1.searchPlugin)(),
    (0, vuepress_plugin_title_1.default)(),
    (0, vuepress_plugin_index_1.default)(),
];
exports.default = (0, vuepress_1.defineUserConfig)({
    theme,
    bundler,
    plugins,
    ...sitePage,
    dest: (0, node_path_1.resolve)(__dirname, 'dist'),
    public: (0, node_path_1.resolve)(__dirname, 'public'),
    temp: (0, node_path_1.resolve)(__dirname, '.vuepress/.temp'),
    cache: (0, node_path_1.resolve)(__dirname, '.vuepress/.cache'),
});
