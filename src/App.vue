<template>
    <el-config-provider :locale="locales">
        <div id="app">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { getLocal } from './util/common'

let locales = ref(zhCn)
let local = getLocal()
switch (local){
    case 'zh':
        locales.value = zhCn
        break;
    case 'en':
        locales.value = en
        break;
    default:
        locales.value = zhCn
        break;
}


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
