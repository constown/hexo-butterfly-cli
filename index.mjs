#!/usr/bin/env node

import { Command } from 'commander'; //进行命令行的操作
import inquirer from 'inquirer' //命令行交互插件 使用require的话 请进行安装8.0的版本 之后的版本不支持esm的模块
import version from './config/version.js'
import defaultHook from "./hook/default.js";
import baseHook from "./hook/base.js";

const program = new Command();

const modeType = {
  base: 'base(生成默认模板)',
  default: 'default(自定义配置Hexo模板)',
  custom: 'custom(自定义配置Hexo、Butterfly模板)(开发中选了也没用)'
}

program
  .version(version.version)

program
  .command('help [command]')
  .description('帮助命令')

program
  .command('init <projectName>')
  .description('初始化博客')
  .action(async (projectName) => {
    const { mode } = await inquirer.prompt({
      type: "list",
      message: "请选择模式",
      name: "mode",
      default: "default",
      choices: [ modeType["base"], modeType["default"], modeType["custom"] ]
    })
    switch (mode) {
      case modeType["base"]:
        baseHook(projectName)
        break
      case modeType["default"]:
        defaultHook(projectName)
        break
      case modeType["custom"]:
        // let customConfig = {}
        // customHook(projectName,customConfig)
        break
      default:
        console.log('error')
    }
  })

program.parse();
