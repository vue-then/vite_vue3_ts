// 通常都是在main.js中处理
import { ElMessage } from 'element-plus'
// 为了实现Class的私有属性
const showMessage = Symbol('showMessage')

type ElMessageType = 'success'|'warning'|'info'|'error'
/** 
 *  重写ElementUI的Message
 *  single默认值true，因为项目需求，默认只弹出一个，可以根据实际需要设置
 */
export default class DonMessage {
    success(options: any, single = true) {
        this[showMessage]('success', options, single)
    }
    warning(options: any, single = true) {
        this[showMessage]('warning', options, single)
    }
    info(options: any, single = true) {
        this[showMessage]('info', options, single)
    }
    error(options: any, single = true) {
        this[showMessage]('error', options, single)
    }

    [showMessage](type: ElMessageType, options: any, single: boolean) {
        if (single) {
            // 判断是否已存在Message
            if (document.getElementsByClassName('el-message').length === 0) {
                ElMessage[type](options)
            }
        } else {
            ElMessage[type](options)
        }
    }
}