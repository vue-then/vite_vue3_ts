<template>
    <div class="home">
        <v-header />
        <!--<v-sidebar />-->
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <!--<v-tags></v-tags>-->
            <div class="content">
                <router-view v-slot="{ Component }">
                    <!--<transition name="move" mode="out-in">-->
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    <!--</transition>-->
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
//import { useStore } from "vuex";
import vHeader from "../components/Header.vue";
//import vSidebar from "../components/Sidebar.vue";
//import vTags from "../components/Tags.vue";


import { useMainStore } from '@/store/mian'
const mainStore = useMainStore()
const tagsList = computed(() =>
    mainStore.tagsList.map((item) => item.name)
);
const collapse = computed(() => mainStore.collapse);


</script>
