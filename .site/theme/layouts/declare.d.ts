
declare module '@temp/category.json' {
  export interface FileItem {
    name: string
    path: string
    filePath: string
    type: 'dir' | 'file'
    ext?: string
    children?: FileItem[]
  }

  // export default 

}
