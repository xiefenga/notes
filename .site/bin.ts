#!/usr/bin/env node

import { program } from 'commander'
import { createBuild, createDev } from 'vuepress'

import vuepressConfig from './config'
import siteConfig from './site.config'

const PKG = module.require('./package.json')

type SiteConfig = {
  sourceDir: string
}

const onBuild = async (path?: string) => {
  const { sourceDir } = siteConfig
  await createBuild(vuepressConfig)(sourceDir)
}

const onDev = async (path?: string) => {
  const { sourceDir } = siteConfig
  await createDev(vuepressConfig)(sourceDir)
}

const onPublish = async () => {

}

program
  .version(PKG.version, '-v')

program
  .command('build [path]')
  .action(onBuild)
  .description('build the source file')

program
  .command('dev [path]')
  .action(onDev)
  .description('run dev server to debug')

program
  .command('publish')
  .action(onPublish)
  .description('publish the dist to server')

program.parse()

