<template>
    <el-select
            v-model="value"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            v-on:change="$emit('change', $event)"
    >
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    import {
        searchGameList,
    } from "@/api/game";  //  此处请自行替换地址
    export default {
        name: "gameSelect",
        model: {
            prop: 'gameId',
            event: 'change'
        },
        props: {
            gameId: {
                // type: Object,
                required: false,
                default: 0,
            },
        },
        data() {
            return {
                options: [],
                value: [],
                loading: false,
                states: []
            }
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.gameSelectFunc(query);
                    this.loading = false;
                } else {
                    this.options = [];
                }
            },
            async gameSelectFunc(searchStr) {
                const res = await searchGameList({ search: searchStr });
                console.log(res);
                if(res.code != 0){
                    this.$message.error(res.msg);
                    return ;
                }
                this.options = res.data.list.map(item => {
                    let opt = {
                        label: item.title,
                        value:  item.appid,
                    };
                    return opt;
                });
                console.log(this.options);
            },
        },
        created() {
            this.gameSelectFunc(this.value);
        }
    }
</script>