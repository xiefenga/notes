// @ts-nocheck
import { path } from '@vuepress/utils'
import type { Theme } from '@vuepress/core'
import { defaultTheme } from '@vuepress/theme-default'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

// import indexPlugin from './pulgins/vuepress-plugin-index'
// import titlePulgin from './pulgins/vuepress-plugin-title'

export const localTheme = (options: DefaultThemeOptions = {}): Theme => {
  return {
    name: 'vuepress-theme-local',
    extends: defaultTheme(options),
    layouts: {
      Index: path.resolve(__dirname, './layouts/Index.vue'),
      Catelog: path.resolve(__dirname, './layouts/Catelog.vue'),
    },
    // plugins: [
    //   indexPlugin(),
    //   titlePulgin()
    // ]
  }
}