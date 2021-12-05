<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">{{'backMantSys'}}</div>
            <el-form ref="ruleForms" :model="ruleForm" status-icon :rules="rules" label-width="0"
                class="ms-content">
                <el-form-item prop="age">
                    <el-input v-model.number="ruleForm.age" type="password" autocomplete="off">
                        <template #prepend><el-icon><user /></el-icon></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" autocomplete="off">
                        <template #prepend><el-icon><lock /></el-icon></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input v-model="ruleForm.checkPass">
                        <template #prepend><el-icon><lock /></el-icon></template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{t('login')}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();

    import { reactive, onMounted, ref, Ref } from "vue";
    import type { ElForm } from 'element-plus'
    import { User, Lock} from '@element-plus/icons'

    type ElFormInstance = InstanceType<typeof ElForm>

    interface Icallback {
        (message?: string | Error | undefined): Error | void
    }

    interface Ivalidate {
        (rule: object, value: number|string, callback: Icallback): void
    }

    let ruleForm = reactive({
        pass: '',
        checkPass: '',
        age: '',
    })
    const ruleForms = ref<ElFormInstance>()

    const checkAge: Ivalidate = (rule, value, callback) => {
        if (value === "") {
            return callback(new Error('Please input the age'))
        }
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    };
    
    const validatePass: Ivalidate = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the password'))
        } else {
            if (ruleForm.checkPass !== '') {
                ruleForms?.value?.validateField('checkPass',()=>{})
            }
            callback()
        }
    }
    const validatePass2: Ivalidate = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('Please input the password again'))
        } else if (value !== ruleForm.pass) {
            callback(new Error("Two inputs don't match!"))
        } else {
            callback()
        }
    }
    let rules = {
        pass: [
            {
                validator: validatePass,
                trigger: 'blur'
            }
        ],
        checkPass: [
            {
                validator: validatePass2,
                trigger: 'blur'
            }
        ],
        age: [
            {
                validator: checkAge,
                trigger: 'blur'
            }
        ],
    }

    let submitForm = () => {
      ruleForms?.value?.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    let resetForm = () => {
      ruleForms?.value?.resetFields()
    }

    

    
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