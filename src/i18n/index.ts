import { createI18n } from 'vue-i18n'
//import elementEnLocale from 'element-plus/lib/locale/lang/en'
//import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
//// 导入自定义语言包
//import enLocale from './en'
//import zhLocale from './zh'

//const messages = {
//    en: {
//        ...enLocale,
//        ...elementEnLocale,
//    },
//    zh: {
//        ...zhLocale,
//        ...elementZhLocale,
//    },
//}

//引入同级目录下文件
const modules = import.meta.globEager('./*')

//假设你还有其他目录下的语言文件 它的路径是 src/views/home/locales/en-US.ts
//那么你就可以 使用 :lower:（小写） :upper:（大写） 来引入文件
const viewModules = import.meta.globEager('../views/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts')

function getLangAll(): any{
  let message:any = {}
  getLangFiles(modules,message)
  getLangFiles(viewModules,message)
  return message
}
/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList:any,msg:any){
  for(let path in mList){
    if(mList[path].default){
      //  获取文件名
      let pathName = path.substr(path.lastIndexOf('/') + 1,5)
      pathName = pathName.slice(0, -3) // .ts
    //  console.log('pathName: ', pathName)
      if(msg[pathName]){
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default
        }
      }else{
        msg[pathName] = mList[path].default
      }
      
    }
  }
}

console.log(getLangAll(),'getAllLang')


//注册i8n实例并引入语言文件
const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    messages: getLangAll()
})

export default i18n
