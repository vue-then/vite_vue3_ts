<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen ? t('unfullScreen') : t('fullScreen')"
                        placement="bottom">
                        <el-icon>
                            <full-screen />
                        </el-icon>
                    </el-tooltip>
                </div>

                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="modifyPwd">{{ t('modify') + t('pwd') }}</el-dropdown-item>
                            <el-dropdown-item command="loginout">{{ t('logout') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import {
        computed,
        getCurrentInstance,
        onMounted,
        ref
    } from "vue";

    import {
        ArrowDown,
        Location,
        Document,
        Menu as IconMenu,
        Setting,
        FullScreen
    } from '@element-plus/icons'

    import router from '@/router';
    import t from '@/util/remake/tlang';
    import {
        useMainStore
    } from '@/store/mian'
    const mainStore = useMainStore()

    const username = localStorage.getItem("ms_username") || 'test';
    const message = 2;

    const collapse = computed(() => mainStore.collapse);
    // 侧边栏折叠
    const collapseChage = () => {
        //store.commit("handleCollapse", !collapse.value);
        mainStore.$patch({
            collapse: !collapse.value
        })
    };

    onMounted(() => {
        if (document.body.clientWidth < 1500) {
            collapseChage();
        }
    });

    const {
        proxy
    } = getCurrentInstance() as any;
    let that = proxy
    let editVisible = ref(false)
    // 用户名下拉菜单选择事件
    const handleCommand = (command: string) => {
        if (command == 'loginout') {
            //that.api.logOut().then(res => {
            //    if (res.success) {
            //        that.$message.success(that.$t('sucLogout'));
            //        localStorage.removeItem('supc_uname');
            //        Lockr.set('token',{});
            //        that.$router.push('/login');
            //    } else {
            //        that.$message.error(res.message);
            //    }
            //});
            router.push('/login');
        }
        if (command == 'modifyPwd') {
            //initFormData()
            editVisible.value = true;
        }
        //if(command == 'language'){
        //    console.log('changlang');
        //}
    };

    let fullscreen = ref(false)
    const fullScreens = () => {
        let el = document.documentElement as any;
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        };
    }

    //退出全屏
    const exitScreen = () => {
        let doc = document as any;
         // 否则将页面全屏
        if (doc.requestFullscreen) {
            doc.requestFullscreen();
        }
        //FireFox
        else if (doc.mozRequestFullScreen) {
            doc.mozRequestFullScreen();
        }
        //Chrome等
        else if (doc.webkitRequestFullScreen) {
            doc.webkitRequestFullScreen();
        }
        //IE11
        else if (doc.msRequestFullscreen) {
            doc.msRequestFullscreen();
        }
    }

    // 全屏事件
    const handleFullScreen = () => {
        fullscreen.value = !fullscreen.value;
        console.log(fullscreen.value)
        if (fullscreen.value) {
            fullScreens()
        } else {
            console.log(1234543)
            exitScreen()
        }
        
    }

    // test
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        font-size: 22px;
        color: #fff;
    }

    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 40px;
    }

    .header .logo {
        float: left;
        width: 250px;
        line-height: 40px;
    }

    .header-right {
        float: right;
        padding-right: 50px;
    }

    .header-user-con {
        display: flex;
        height: 40px;
        align-items: center;
    }

    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }

    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }

    .btn-bell .el-icon-bell {
        color: #fff;
    }

    .user-name {
        margin-left: 10px;
    }

    .user-avator {
        margin-left: 20px;
    }

    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>