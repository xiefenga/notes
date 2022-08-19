"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const core_1 = require("@vuepress/core");
const travel = async (dirPath) => {
    const [tree, arr] = await walk(dirPath);
    return [
        { name: '/', path: '/', filePath: '/', type: 'dir', children: tree },
        arr
    ];
};
const walk = async (dirPath, startPath = dirPath) => {
    const allPath = [{ type: 'dir', path: (0, node_path_1.resolve)('/', (0, node_path_1.relative)(startPath, dirPath)) }];
    const files = await (0, promises_1.readdir)(dirPath, { withFileTypes: true });
    const filesTree = await Promise.all(files.filter(item => !item.name.startsWith('.'))
        .map(async (item) => {
        const filePath = (0, node_path_1.resolve)(dirPath, item.name);
        const fullPath = (0, node_path_1.resolve)('/', (0, node_path_1.relative)(startPath, filePath));
        const x = (0, node_path_1.parse)(fullPath);
        const path = (0, node_path_1.resolve)(x.dir, x.name);
        if (item.isFile()) {
            allPath.push({ type: 'file', path });
            return { name: x.name, path, type: 'file', filePath: fullPath, ext: x.ext };
        }
        const [children, subPaths] = await walk(filePath, startPath);
        allPath.push(...subPaths);
        return { name: x.name, path, type: 'dir', filePath: fullPath, children };
    }));
    return [filesTree, allPath];
};
exports.default = () => {
    return {
        name: 'vuepress-plugin-index',
        multiple: false,
        async onInitialized(app) {
            const [siteData, allPath] = await travel(app.options.source);
            const needAdd = allPath.filter(pathItem => pathItem.type === 'dir' && !app.pages.find(item => item.path === pathItem.path))
                .map(item => item.path);
            const pages = await Promise.all(needAdd.map(path => (0, core_1.createPage)(app, {
                path,
                frontmatter: {
                    path,
                    layout: 'Catelog',
                },
                content: ``
            })));
            app.pages.push(...pages);
            await Promise.all([
                app.writeTemp('category.json', JSON.stringify(siteData, null, 2)),
                app.writeTemp('allPath.json', JSON.stringify(allPath, null, 2))
            ]);
        }
    };
};
