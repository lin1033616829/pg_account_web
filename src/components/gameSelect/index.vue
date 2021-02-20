<template>
    <el-select
            v-model="value"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading"
            v-on:change="$emit('changeGame', $event)"
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
        props: ['gameId'],
        data() {
            return {
                options: [],
                value: '',
                loading: false,
                states: []
            }
        },
        watch: {
            gameId (val) {
                this.value = val;
                this.remoteMethod(val);
            }
        },
        methods: {
            remoteMethod(query) {
                this.loading = true;
                this.gameSelectFunc(query);
                this.loading = false;
            },
            async gameSelectFunc(searchStr) {
                if(searchStr == 0){
                    searchStr = "";
                }
                const res = await searchGameList({ search: searchStr });
                console.log(res);
                if(res.code != 0){
                    this.$message.error(res.msg);
                    return ;
                }
                this.options = res.data.list.map(item => {
                    let opt = {
                        label: "[ " + item.appid +" ]  " + item.title ,
                        value:  item.appid,
                    };
                    return opt;
                });
                console.log(this.options);
            },
        },
        created() {
            this.value = this.gameId;
            this.gameSelectFunc(this.value);
        }
    }
</script>