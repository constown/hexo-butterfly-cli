import ora from "ora";
import { descriptionNextStep, downLoadTemplate, initConfig } from "../utils/index.js";
import inquirer from "inquirer";
import { defaultQuestion } from '../question/index.js'


async function handleConfig(projectName) {
  const cmdConfig = await inquirer.prompt(defaultQuestion)
  initConfig(projectName, '_config.yml', cmdConfig)
}

export default function defaultHook(projectName) {
  const spinner = ora('开始生成自定义模板...')
  spinner.start();
  spinner.succeed()
  // 直接下载模板到本地就可以了
  downLoadTemplate(projectName, 'default').then(async (projectName) => {
    // 开始走配置
    const spinner = ora('开始初始化项目...');
    spinner.start()
    initConfig(projectName, 'package.json', { projectName })
    spinner.succeed()
    spinner.color = "green"
    spinner.text = '🛫️ 初始化项目成功'
    spinner.succeed()
    spinner.color = "green"
    spinner.text = '开始初始化配置'
    spinner.start()
    spinner.succeed()
    await handleConfig(projectName)
    spinner.color = "green"
    spinner.text = '🛫️ 初始化配置成功'
    spinner.succeed()
    // 提示用户进入项目安装
    descriptionNextStep(projectName)
  }).catch(err => {
    console.log(err)
  })
}



