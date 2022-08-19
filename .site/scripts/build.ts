import { createBuild } from 'vuepress'
import vuepressConfig from '../config'
import siteConfig from '../site.config'

const onBuild = async () => {
  const { sourceDir } = siteConfig
  await createBuild(vuepressConfig)(sourceDir)
}

onBuild()