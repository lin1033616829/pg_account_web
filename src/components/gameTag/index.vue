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
    import { goodsTagSearch } from "@/api/goods_tag";
    export default {
        name: "gameTag",
        props: ['gameId', 'curId'],
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
                this.remoteMethod(val);
            },
            curId (val) {
                this.value = val;
                // this.remoteMethod(val);
            },
        },
        methods: {
            remoteMethod(query) {
                this.loading = true;
                this.getSelectFunc(query);
                this.loading = false;
            },
            async getSelectFunc(searchStr) {
                if(searchStr == 0){
                    searchStr = "";
                }
                const res = await goodsTagSearch({ game_id: searchStr });
                console.log(res);
                if(res.code != 0){
                    this.$message.error(res.msg);
                    return ;
                }
                this.options = res.data.list.map(item => {
                    let opt = {
                        label: "[ " + item.id +" ]  " + item.name ,
                        value:  item.id,
                    };
                    return opt;
                });
                console.log(this.options);
            },
        },
        created() {
            this.value = this.gameId;
            console.log("gameId", this.gameId);
            console.log("curId", this.curId);
            this.getSelectFunc(this.value);
        }
    }
</script>