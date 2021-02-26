<template>
    <el-select
            v-model="value"
            filterable

            reserve-keyword
            placeholder="请选择或搜索"

            :loading="loading"
            v-on:change="$emit('changeGame', $event)"
    >
<!--        remote-->
<!--        :remote-method="remoteMethod"-->
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
        props: ['gameId', 'readOnly'],
        data() {
            return {
                ifNotRequest:true,
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
                if(this.ifNotRequest){
                    this.loading = false;
                    return ;
                }
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
            if(this.gameId == 0){
                this.value = "";
            }else{
                this.value = this.gameId;
            }
            this.gameSelectFunc(this.value);
        }
    }
</script>