import { readdir } from 'node:fs/promises'
import { resolve, relative, parse } from 'node:path'

import { App, createPage } from '@vuepress/core'

interface FileItem {
  name: string
  path: string
  filePath: string
  type: 'dir' | 'file'
  ext?: string
  children?: FileItem[]
}

interface PathItem {
  type: 'dir' | 'file'
  path: string
}

const travel = async (dirPath: string): Promise<[FileItem, PathItem[]]> => {
  const [tree, arr] = await walk(dirPath)
  return [
    { name: '/', path: '/', filePath: '/', type: 'dir', children: tree },
    arr
  ]
}

const walk = async (dirPath: string, startPath: string = dirPath): Promise<[FileItem[], PathItem[]]> => {
  const allPath: PathItem[] = [{ type: 'dir', path: resolve('/', relative(startPath, dirPath)) }]
  const files = await readdir(dirPath, { withFileTypes: true })
  const filesTree: FileItem[] = await Promise.all(
    files.filter(item => !item.name.startsWith('.'))
      .map(async item => {
        const filePath = resolve(dirPath, item.name)
        const fullPath = resolve('/', relative(startPath, filePath))
        const x = parse(fullPath)
        const path = resolve(x.dir, x.name)
        if (item.isFile()) {
          allPath.push({ type: 'file', path })
          return { name: x.name, path, type: 'file', filePath: fullPath, ext: x.ext }
        }
        const [children, subPaths] = await walk(filePath, startPath)
        allPath.push(...subPaths)
        return { name: x.name, path, type: 'dir', filePath: fullPath, children }
      })
  )
  return [filesTree, allPath]
}

export default () => {

  return {
    name: 'vuepress-plugin-index',
    multiple: false,

    async onInitialized(app: App) {
      const [siteData, allPath] = await travel(app.options.source)
      const needAdd = allPath.filter(pathItem => pathItem.type === 'dir' && !app.pages.find(item => item.path === pathItem.path))
        .map(item => item.path)

      const pages = await Promise.all(
        needAdd.map(path =>
          createPage(app, {
            path,
            frontmatter: {
              path,
              layout: 'Catelog',
            },
            content: ``
          })
        )
      )

      app.pages.push(...pages)

      await Promise.all([
        app.writeTemp('category.json', JSON.stringify(siteData, null, 2)),
        app.writeTemp('allPath.json', JSON.stringify(allPath, null, 2))
      ])
    }
  }
}