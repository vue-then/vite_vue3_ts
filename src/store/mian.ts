import { defineStore } from 'pinia'

interface TypeMain {
    name: string
    tagsList: any[]
    collapse: boolean
}

export const useMainStore = defineStore({
    id: 'mian',
    state: (): TypeMain => ({
        name: '超级管理员',
        tagsList: [],
        collapse: false,
    }),
    getters: {
        nameLength: (state) => state.name.length,
    },
    actions: {
        async insertPost(data: string) {
            // 可以做异步
            // await doAjaxRequest(data);
            this.name = data
        },
    },
})
