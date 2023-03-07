import ora from "ora";
import { descriptionNextStep, downLoadTemplate, initConfig } from "../utils/index.js";


export default function customHook (projectName) {
  const spinner = ora('开始生成自定义模板...')
  spinner.start();
  spinner.succeed()
// 直接下载模板到本地就可以了
//   downLoadTemplate(projectName).then(()=>{
  initConfig(projectName,'package.json',{title: 'Tuzi'})
    // 提示用户进入项目安装
    // descriptionNextStep(projectName)
  // }).catch(err => {
  //   console.log(err)
  // })
}
