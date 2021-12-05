<template>
    <div class="lang-tool" v-if="langCom.isShow">
        <el-select class="langs" v-model="langCom.lang" filterable size="mini" 
            @change="fixLang"
            :placeholder="$t('p_choose')">
            <el-option
                v-for="item in langCom.langData"
                :key="item.code"
                :label="item.value"
                :value="item.code">
            </el-option>
        </el-select>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
let { locale } = useI18n()
import Lockr from 'lockr'

import { getLocal } from "@/util/common";
import $t from '@/util/remake/tlang';


let langCom = reactive<{
    isShow: boolean;
    lang: string;
    langIndex: number;
    langData: Array<any>;
    flag: boolean;
    isLogin: boolean;
}>({
    isShow: true,
    lang: (getLocal() as string),
    langIndex: 0,
    langData: [],
    flag: true,
    isLogin: sessionStorage.getItem("token") ? true : false,
})

console.log(
    getLocal()
)

let langsImgArr = [
    // {
    //     key: 'zh',
    //     value: '简体中文',
    //     code: 'zh_CN',
    //     src: langzh
    // },
    {
        key: "zh",
        value: '简体中文',
        code: 'zh',
    },
    {
        key: 'tc',
        value: '新加坡',
        code: 'tc',
    },
    {
        key: 'en',
        value: 'English',
        code: 'en',
    },
    
]

langCom.langData = langsImgArr

let fixLang = (val:string) => {
    locale.value = val
    Lockr.set('local', val)
    console.log('val: ', val)
    window.location.reload()
}



</script>
