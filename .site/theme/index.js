"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localTheme = void 0;
// @ts-nocheck
const utils_1 = require("@vuepress/utils");
const theme_default_1 = require("@vuepress/theme-default");
// import indexPlugin from './pulgins/vuepress-plugin-index'
// import titlePulgin from './pulgins/vuepress-plugin-title'
const localTheme = (options = {}) => {
    return {
        name: 'vuepress-theme-local',
        extends: (0, theme_default_1.defaultTheme)(options),
        layouts: {
            Index: utils_1.path.resolve(__dirname, './layouts/Index.vue'),
            Catelog: utils_1.path.resolve(__dirname, './layouts/Catelog.vue'),
        },
        // plugins: [
        //   indexPlugin(),
        //   titlePulgin()
        // ]
    };
};
exports.localTheme = localTheme;
