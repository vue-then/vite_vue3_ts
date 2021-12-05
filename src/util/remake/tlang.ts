import i18n from '@/i18n'

const { t } = i18n.global

const $t = (key:string, obj?:any):string => {
   if(obj){
       return t(key,obj)?t(key,obj):key
   }else{
       return t(key)?t(key):key
   }
}
export default $t


