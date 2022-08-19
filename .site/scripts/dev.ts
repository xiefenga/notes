import { createDev } from 'vuepress'
import vuepressConfig from '../config'
import siteConfig from '../site.config'

async function onDev() {
  const { sourceDir } = siteConfig
  await createDev(vuepressConfig)(sourceDir)
}

onDev()




