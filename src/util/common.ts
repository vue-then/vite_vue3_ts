import Lockr from 'lockr'

export const getLocal = ():string => {
    return Lockr.get('local') ? Lockr.get('local') : 'zh'
}