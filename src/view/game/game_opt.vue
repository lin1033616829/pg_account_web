<template>
    <div>
        <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="120px"   >

                <!--      <el-form-item label="开发者ID:" v-show="!isCreate">-->
                <!--             <el-input v-model.number="formData.adminId" clearable placeholder="请输入"></el-input>-->
                <!--      </el-form-item>-->

                <!--                <el-form-item label="上线状态:" prop="status" v-show="!isCreate">-->
                <!--                    <el-tooltip :content="'Switch value: '" placement="top">-->
                <!--                        <el-switch-->
                <!--                                v-model="formData.status"-->
                <!--                                active-color="#13ce66"-->
                <!--                                inactive-color="#dcdfe6"-->
                <!--                                active-value=2-->
                <!--                                inactive-value=1>-->
                <!--                        </el-switch>-->
                <!--                    </el-tooltip>-->
                <!--                </el-form-item>-->



                <el-form-item label="游戏名称:" prop="title">
                    <el-input v-model="formData.title" clearable placeholder="请输入" ></el-input>
                </el-form-item>

                <el-form-item label="描述:" prop="info">
                    <el-input type="textarea" placeholder="请输入" v-model="formData.info"></el-input>
                </el-form-item>

                <el-form-item label="分类:" prop="cate">
                    <!--            <el-input v-model="formData.cate" clearable placeholder="请输入" ></el-input>-->
                    <el-select v-model="formData.cate" placeholder="请选择分类">
                        <el-option v-for="item in gameTypeList" :key="item"  :value="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="引擎:" prop="engine">
                    <el-select v-model="formData.engine" placeholder="请选择引擎">
                        <el-option
                                v-for="(item,key) in engineTypeMap"
                                :key="+key"
                                :label="item"
                                :value="+key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-show="!isCreate" label="应用id:"><el-input readonly v-model.number="formData.appid" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="SDK使用:" v-show="!isCreate">
                    <el-input readonly v-model="formData.appkey" clearable placeholder="请输入" ></el-input>
                </el-form-item>

                <el-form-item label="后端对接key:" v-show="!isCreate">
                    <el-input readonly v-model="formData.serverkey" clearable placeholder="请输入" ></el-input>
                </el-form-item>

                <el-form-item label="聚合登录服务:" prop="serviceAccount"><el-input v-model.number="formData.serviceAccount" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="匹配服开通状态" prop="serviceMatch"><el-input v-model.number="formData.serviceMatch" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="聚合支付服务:" prop="servicePay"><el-input v-model.number="formData.servicePay" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="好友关系服务:" prop="serviceFriends"><el-input v-model.number="formData.serviceFriends" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="数据服务:" prop="serviceData"><el-input v-model.number="formData.serviceData" clearable placeholder="请输入"></el-input>
                </el-form-item>

                <!--         <el-form-item label="创建时间:" v-show="!isCreate"><el-input readonly v-model.number="formData.createdAt" clearable placeholder="请输入"></el-input>-->
                <!--      </el-form-item>-->
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button @click="enterDialog" type="primary">确 定</el-button>
            </div>
    </div>
</template>

<script>
    import {
        createGame,
        deleteGame,
        deleteGameByIds,
        updateGame,
        findGame,
        getGameList,
        getGameOtherData,
        notifyGame,
        updateGameStatus,
    } from "@/api/game";  //  此处请自行替换地址
    import { globalConf } from "@/utils/global/global";
    import { formatTimeToStr } from "@/utils/date";
    import infoList from "@/mixins/infoList";
    export default {
        name: "game_opt",
        mixins: [infoList],
        data() {
            return {
                isCreate:true,
                engineTypeMap:{},
                gameTypeList:[],
                listApi: getGameList,
                dialogFormVisible: false,
                type: "",
                deleteVisible: false,
                multipleSelection: [],
                formData: {
                    adminId:0,
                    status:'2',
                    title:"",
                    info:"",
                    cate:"",
                    engine:1,
                    appid:0,
                    appkey:"",
                    serverkey:"",
                    serviceAccount:0,
                    serviceMatch:0,
                    servicePay:0,
                    serviceFriends:0,
                    serviceData:0,
                    createdAt:0,

                },
                rules: {
                    title: [
                        { required: true, message: '游戏名称不得为空', trigger: 'change' },
                        { min: 3, max: 20, message: '长度在 3-20 个字符以内', trigger: 'change' },
                    ],
                    info: [
                        { required: true, message: '描述不得为空', trigger: 'change' },
                        { min: 3, max: 200, message: '长度在 3-150 个字符以内', trigger: 'change' },
                    ],
                    cate: [
                        { required: true, message: '分类不得为空', trigger: 'change' },
                    ],
                    engine: [
                        { required: true, message: '分类不得为空', trigger: 'change' },
                    ],
                    serviceAccount: [
                        { type: 'number', message: '展示次数必须为整数', trigger: 'blur' },
                    ],
                },
            };
        },
        filters: {
            formatDate: function(time) {
                if (time != null && time != "") {
                    time *= 1000
                    var date = new Date(time);
                    console.log("data", date)
                    return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
                } else {
                    return "";
                }
            },
            formatBoolean: function(bool) {
                if (bool != null) {
                    return bool ? "是" :"否";
                } else {
                    return "";
                }
            },
            toNumber: function(s) {
                return s && +s;
            }
        },
        methods: {
            //条件搜索前端看此方法
            showEngine(status){
                return this.engineTypeMap[status];
            },
            showStatus(status){
                return globalConf.game.statusMap[status];
            },
            showNotify(status){
                console.log(status);
                return globalConf.game.notifyNo == status;
            },
            addClassStatus(status){
                if(status == globalConf.game.statusOn){
                    return 'statusOn';
                }
                return 'statusOff';
            },
            onSubmit() {
                this.page = 1
                this.pageSize = 10
                this.getTableData()
            },
            resetSubmit(){
                this.searchInfo = {};
                this.onSubmit();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            async updOpt(row, type="notify"){
                let sendData = {
                    id: row.ID,
                };
                let res;
                if(type == "notify"){
                    res = await notifyGame(sendData);
                }else{
                    res = await updateGameStatus(sendData);
                }
                console.log("res", res);
                if (res.code == 0) {
                    this.$message({
                        type: "success",
                        message: res.msg,
                    });
                    await this.getTableData();
                }
            },
            deleteRow(row){
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteGame(row);
                });
            },
            async onDelete() {
                const ids = []
                if(this.multipleSelection.length == 0){
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的数据'
                    })
                    return
                }
                this.multipleSelection &&
                this.multipleSelection.map(item => {
                    ids.push(item.ID)
                })
                const res = await deleteGameByIds({ ids })
                if (res.code == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    if (this.tableData.length == ids.length) {
                        this.page--;
                    }
                    this.deleteVisible = false
                    this.getTableData()
                }
            },
            async updateGame(row) {
                const res = await findGame({ ID: row.ID });
                this.type = "update";
                this.isCreate = false;
                if (res.code == 0) {
                    this.formData = res.data.regame;
                    this.formData.status = this.formData.status.toString()
                    // this.formData.engine = this.formData.engine.toString()
                    // this.formData = row;
                    this.dialogFormVisible = true;
                }
            },
            closeDialog() {
                this.dialogFormVisible = false;
                this.formData = {
                    adminId:0,
                    status: '2',
                    title:"",
                    info:"",
                    cate:"",
                    engine:1,
                    appid:0,
                    appkey:"",
                    serverkey:"",
                    serviceAccount:0,
                    serviceMatch:0,
                    servicePay:0,
                    serviceFriends:0,
                    serviceData:0,
                    createdAt:0,

                };
            },
            async deleteGame(row) {
                const res = await deleteGame({ ID: row.ID });
                if (res.code == 0) {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    if (this.tableData.length == 1) {
                        this.page--;
                    }
                    this.getTableData();
                }
            },
            async getOtherData() {
                const res = await getGameOtherData();
                if (res.code == 0) {
                    this.gameTypeList = res.data.gameTypeList;
                    this.engineTypeMap = res.data.engineTypeMap;
                }
                console.log("engineTypeMap", this.engineTypeMap)
                console.log("gameTypeList", this.gameTypeList)
            },
            async enterDialog() {
                let res;
                let isValidate = false;
                this.$refs['formData'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    isValidate = true;

                });
                if(!isValidate){
                    this.$message.error('请检查页面错误信息！');
                    return false;
                }
                this.formData.status = parseInt(this.formData.status)

                switch (this.type) {
                    case "create":
                        res = await createGame(this.formData);
                        break;
                    case "update":
                        res = await updateGame(this.formData);
                        break;
                    default:
                        res = await createGame(this.formData);
                        break;
                }
                if (res.code == 0) {
                    this.$message({
                        type:"success",
                        message:"创建/更改成功"
                    })
                    this.closeDialog();
                    this.getTableData();
                }
            },
            openDialog() {
                this.type = "create";
                this.isCreate = true;
                this.dialogFormVisible = true;
            }
        },
        async created() {
            alert(1);
            // await this.getOtherData();
            // await this.getTableData();
        }
    };
</script>

<style scoped>
    .statusOn{
        color: green;
    }
    .statusOff{
        color:#d9d9d9;
    }
</style>
