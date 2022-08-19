"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
exports.default = () => {
    return {
        name: 'vuepress-plugin-title',
        multiple: false,
        extendsPageOptions(options, _app) {
            if (options.filePath) {
                const parse = node_path_1.default.parse(options.filePath);
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
