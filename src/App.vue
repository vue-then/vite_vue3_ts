<template>
    <el-config-provider :locale="locales">
        <div id="app">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import { defineComponent,ref } from 'vue'
defineComponent({
    name: 'App',
    setup(){
    }
})
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { Language } from 'element-plus/es/locale'
import i18n from './i18n'
import { useI18n } from 'vue-i18n'
let { locale } = useI18n()

//let locale:Language = zhCn
let locales:Language = zhCn



setTimeout(() => {
    locale.value = 'en' 
},1000)

</script>

<style lang="scss" scoped>
    @import url('assets/style/app.scss');
    #app{
        position: absolute;
        padding: 0;
        margin: 0;
        top: 0;
        left: 0;
    }
</style>
