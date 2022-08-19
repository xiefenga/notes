"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("node:path"));
exports.default = () => {
    return {
        name: 'vuepress-plugin-title',
        multiple: false,
        extendsPageOptions(options, _app) {
            if (options.filePath) {
                const parse = path.parse(options.filePath);
                const filename = parse.name;
                options.frontmatter ??= {};
                options.frontmatter.title ??= filename;
                // const stat = statSync(options.filePath)
                // ctime
                // options.frontmatter.author = '谢峰'
                // options.frontmatter.date = stat.mtime
                // options.frontmatter.categories = [
                //     // parse.dir
                //     path.join('/', path.relative(path.join(__dirname, '../docs'), path.format(path.parse(parse.dir))))
                // ]
            }
        }
    };
};
