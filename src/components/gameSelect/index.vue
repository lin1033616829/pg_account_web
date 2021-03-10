<template>
    <div class="showReadOnly" >
        <el-select
                v-model="value"
                filterable
                :remote="isCp"
                :remote-method="remoteMethod"
                :disabled="readOnly"
                reserve-keyword
                placeholder="请选择或搜索"
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
    </div>


</template>

<script>
    import {
        searchGameList,
    } from "@/api/game";  //  此处请自行替换地址
    import { mapGetters } from 'vuex'
    export default {
        name: "gameSelect",
        props: ['gameId', 'readOnly'],
        computed: {
            ...mapGetters('user', ['userInfo']),
            isCp() {
                return this.userInfo.authorityId == 888;
            },
        },
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
            console.log("-------------", this.readOnly);
            if(this.readOnly == undefined){
                this.readOnly = false;
            }
        },
    }
</script>