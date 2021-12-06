<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">{{'backMantSys'}}</div>
            <el-form ref="ruleForms" :model="ruleForm" status-icon :rules="rules" label-width="0"
                class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="ruleForm.account" type="text" autocomplete="off" :placeholder="t('p_act')">
                        <template #prepend><el-icon><user /></el-icon></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" :placeholder="t('p_pwd')">
                        <template #prepend><el-icon><lock /></el-icon></template>
                    </el-input>
                </el-form-item>
                <lang-tool/>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{t('login')}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import t from '@/util/remake/tlang';
    import langTool from '@/components/lang/index.vue'

    import { reactive, onMounted, ref, Ref, ComponentInternalInstance } from "vue";
    import { ElForm } from 'element-plus'
    import { User, Lock} from '@element-plus/icons'

    import { getCurrentInstance } from 'vue'
    import router from '@/router';
    import { Login } from '@/service/api/auth/types';

    //const proxy  = (getCurrentInstance() as ComponentInternalInstance).proxy
    const { proxy } = getCurrentInstance() as any;

    type ElFormInstance = InstanceType<typeof ElForm>
    interface Icallback {
        (message?: string | Error | undefined): Error | void
    }
    interface Ivalidate {
        (rule: object, value: number|string, callback: Icallback): void
    }
    let ruleForm = reactive<Login>({
        account: 'chatadmin',
        password: '#123456'
    })
    const ruleForms = ref<ElFormInstance>()
    let rules = {
        account: [{ required: true, message: t('p_act'),  trigger: 'blur' }],
        password: [{ required: true, message: t('p_pwd'), trigger: 'blur' }],
    }
    let submitForm = () => {
      ruleForms?.value?.validate((valid) => {
        proxy.$message.success(t('success'))
        if (valid) {
            proxy.$api.getLogin(ruleForm).then((res:any) => {
                if(res.success){
                    Lockr.set("token", res.data);
                    proxy.$message.success(t('sucLogin'));
                    Lockr.set('supc_uname', ruleForms);
                    router.push('/dashboard');
                }else{
                    proxy.$message.error(res.message)
                }
            })
            
        } else {
            proxy.$message.error(t('p_actpwd'));
            console.log('error submit!!');
            return false;
        }
      })
    }

    // 

    
</script>

<style lang="scss" scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url('@/assets/img/login-bg.jpg') !important;
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #000;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
        margin-top: 20px;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }

    .tools {
        height: 30px;
        line-height: 30px;
        display: flex;
        /* justify-content: flex-end; */
        justify-content: space-between;
        margin-bottom: 10px;

        :v-deep .el-checkbox {
            margin: 0;
            z-index: 0;

            .el-checkbox__label {
                font-size: 12px;
            }
        }

        .langs {
            width: 100px;
        }
    }
</style>