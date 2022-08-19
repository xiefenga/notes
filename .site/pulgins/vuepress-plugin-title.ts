import path from 'node:path'
import { App, PageOptions } from '@vuepress/core'

export default () => {
	return {
		name: 'vuepress-plugin-title',
		multiple: false,
		extendsPageOptions(options: PageOptions, _app: App) {
			if (options.filePath) {
				const parse = path.parse(options.filePath)
				const filename = parse.name
				options.frontmatter ??= {}
				options.frontmatter.title ??= filename
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
	}
}
