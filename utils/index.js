/*
 * @use:
 * @description:
 * @SpecialInstructions: 无
 * @Author: clearlove
 * @Date: 2022-11-21 10:55:41
 * @FilePath: /lm-cli/tools.js
 */
import handlebars from 'handlebars' //模板引擎
import chalk from 'chalk'; // 提示文字
import fs from 'fs' // 文件读取
import logSymbols from 'log-symbols'; //提示符号
import ora from 'ora' //添加loading效果
import download from 'download-git-repo'; //使用插件进行下载远程仓库的项目
import { templateObject } from '../config/templates.js'

const log = console.log;
/**
 * @fucntion 重写并初始化package.json文件
 * @param {string} PN 项目名称
 * @param {string} fileName 文件名
 * @param {Object} config 配置内容
 */
export const initConfig = (PN, fileName, config = {}) => {
  let init = ''
  init = new Promise((res, rej) => {
    const packagePath = `${ PN }/${ fileName }`
    const packageContent = fs.readFileSync(packagePath, 'utf8')
    const packageFinalValue = handlebars.compile(packageContent)(config)
    fs.writeFileSync(packagePath, packageFinalValue)
    res()
  })
  return init
}

/**
 * @function downLoadTemplate 下载项目
 * @param {string} PN 项目自定义名称
 * @param {string} mode 模板模式
 * @returns
 */
export const downLoadTemplate = (PN = "", mode) => {
  const spinner = ora('模板地址获取中...');
  spinner.start()
  const { downloadUrl } = templateObject[mode]
  let down = ''
  if (downloadUrl) {
    down = new Promise((res, rej) => {
      spinner.color = 'green';
      spinner.text = '模板地址获取成功';
      spinner.succeed()
      spinner.color = 'green';
      spinner.text = '开始下载模板...';
      spinner.start()
      download(downloadUrl, PN, { clone: true }, (err) => {
        if (err) {
          spinner.fail()
          spinner.color = 'red';
          spinner.text = `模板下载失败，请重新操作,失败原因：${ err }`;
          spinner.fail()
          rej(err)
          return
        }
        spinner.succeed()
        spinner.color = 'green';
        spinner.text = '🎉 模板下载成功🎉';
        spinner.succeed()
        res(PN)
      })
    })
  } else {
    spinner.fail()
    spinner.color = 'red';
    spinner.text = '链接获取失败，请重新获取';
    spinner.fail()
  }
  return down
}

/**
 * @funtion descriptionNextStep 描述最后应该的步骤
 * @param {*} name 项目或者模板名称
 */
export const descriptionNextStep = (name) => {
  log(chalk.magenta(`-------开始您的项目-------`))
  log(chalk.magenta(logSymbols.success, `cd ${ name }`))
  log(chalk.magenta(logSymbols.success, `npm install`))
}
