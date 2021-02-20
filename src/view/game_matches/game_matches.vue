<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">      
            <el-form-item label="GameID">
                <el-input placeholder="搜索条件" v-model="searchInfo.game_id"></el-input>
            </el-form-item>
            <el-form-item label="规则名称">
              <el-input placeholder="搜索条件" v-model="searchInfo.name"></el-input>
            </el-form-item>

          <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
          <el-button @click="resetSubmit" type="primary" plain>重置</el-button>
        </el-form-item>
          <br>
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增游戏匹配</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="top" v-model="deleteVisible" width="160">
            <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click="deleteVisible = false" size="mini" type="text">取消</el-button>
                <el-button @click="onDelete" size="mini" type="primary">确定</el-button>
              </div>
<!--            <el-button icon="el-icon-delete" size="mini" slot="reference" type="danger">批量删除</el-button>-->
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      ref="multipleTable"
      stripe
      style="width: 100%"
      tooltip-effect="dark"
    >
    <el-table-column type="selection" width="55"></el-table-column>
    
<!--    <el-table-column label="ID" prop="id" width="120"></el-table-column> -->
    
    <el-table-column label="GameID" prop="game_id" width="120"></el-table-column>

    <el-table-column label="规则名称" prop="name" width="120">
        <template slot-scope="scope">
            <span>{{getStrByPos(scope.row.name, 10)}}</span>
        </template>
    </el-table-column>
    
    <el-table-column label="匹配代码" prop="match_code" width="120"></el-table-column>

    <el-table-column label="匹配最大人数" prop="max_players" width="120"></el-table-column>

    <el-table-column label="超时设置" prop="timeout" width="120"></el-table-column>

    <el-table-column label="帧频率" prop="fps" width="120"></el-table-column>


<!--    <el-table-column label="规则内容" prop="rule" width="120"></el-table-column>-->
    <el-table-column label="规则内容" prop="path" width="80">
        <template slot-scope="scope">
            <div>
                <el-popover placement="top-start" trigger="hover" v-if="scope.row.rule">
                    <div class="popover-box">
                        <pre>{{fmtBody(scope.row.rule)}}</pre>
                    </div>
                    <i class="el-icon-view" slot="reference"></i>
                </el-popover>

                <span v-else>无</span>
            </div>
        </template>
    </el-table-column>




    <el-table-column label="更新日期" width="180">
        <template slot-scope="scope">{{scope.row.UpdatedAt|formatDate}}</template>
    </el-table-column>

    <el-table-column label="上线状态" prop="status" width="120">
        <template slot-scope="scope">
            <div :class="addClassStatus(scope.row.status)">{{ showStatus(scope.row.status) }}</div>
        </template>
    </el-table-column>
    
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button class="table-button" @click="updateGameMatches(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>
            <el-button class="table-button" size="small" type="warning" icon="el-icon-switch-button" @click="updOpt(scope.row, 'status')">{{ showOptStatus(scope.row.status) }}</el-button>
            <el-button type="success" icon="el-icon-s-promotion" size="mini" v-show="showNotify(scope.row.notify)" @click="updOpt(scope.row)">通知</el-button>
            <el-button type="danger" v-show="showDelBtn(scope.row)" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{float:'right',padding:'20px'}"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <el-dialog :before-close="closeDialog" :visible.sync="dialogFormVisible" title="弹窗操作">
      <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="120px">

<!--        <el-form-item label="ID:"><el-input v-model.number="formData.id" clearable placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->

         <el-form-item label="GameID:" prop="game_id">
<!--             <el-input v-model.number="formData.game_id" clearable placeholder="请输入"></el-input>-->
             <game-select @change="gameIdChange" v-model="formData.game_id" />
        </el-form-item>
       
         <el-form-item label="规则名称:" prop="name">
            <el-input v-model="formData.name" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="匹配代码:" prop="match_code">
            <el-input v-model="formData.match_code" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="匹配最大人数:" prop="max_players">
             <el-input v-model.number="formData.max_players" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="规则内容:" prop="rule">
             <el-input type="textarea" placeholder="请输入" v-model="formData.rule"></el-input>
      </el-form-item>
       
         <el-form-item label="超时设置:" prop="timeout">
             <el-input v-model.number="formData.timeout" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="帧频率:" prop="fps">
             <el-input v-model.number="formData.fps" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
<!--         <el-form-item label="缓存通知:"><el-input v-model.number="formData.notify" clearable placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->
<!--       -->
<!--         <el-form-item label="状态:"><el-input v-model.number="formData.status" clearable placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->
       </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
    createGameMatches,
    deleteGameMatches,
    deleteGameMatchesByIds,
    updateGameMatches,
    findGameMatches,
    getGameMatchesList,
    // getGameMatchOtherData,
    notify,
    updateGameMatchStatus,
} from "@/api/game_match";  //  此处请自行替换地址
import gameSelect from "@/components/gameSelect";
import { formatTimeToStr } from "@/utils/date";
import { getStrPos } from "@/utils/stringFun";
import { globalConf } from "@/utils/global/global";
import infoList from "@/mixins/infoList";
export default {
  name: "game_matches",
  mixins: [infoList],
  components: { gameSelect },
  data() {
    return {
      listApi: getGameMatchesList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
            id:0,
            game_id:0,
            name:"",
            match_code:"",
            max_players:0,
            rule:"",
            timeout:0,
            fps:0,
            notify:0,
            status:0,
            
      },
    rules: {
        game_id: [
            { required: true, message: '游戏ID不得为空', trigger: 'change' },
        ],
        name: [
            { required: true, message: '规则名称', trigger: 'change' },
            { min: 3, max: 30, message: '长度在 3-30 个字符以内', trigger: 'change' },
        ],
        match_code: [
            { required: true, message: '匹配代码', trigger: 'change' },
        ],
        team_type: [
            { required: true, message: '团队类型不得为空', trigger: 'change' },
        ],
        max_players: [
            { required: true, message: '匹配最大人数不得为空', trigger: 'change' },
            { type: 'number', message: '匹配最大人数必须为整数', trigger: 'blur' },
        ],
        rule: [
            { required: true, message: '表达式匹配规则', trigger: 'change' },
        ],
        timeout: [
            { required: true, message: '匹配超时时间不得为空', trigger: 'change' },
            { type: 'number', message: '匹配超时时间必须为整数', trigger: 'blur' },
        ],
        fps: [
            { required: true, message: '帧率不得为空', trigger: 'change' },
            { type: 'number', message: '匹配超时时间必须为整数', trigger: 'blur' },
        ],
    },
    };
  },
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
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
    }
  },
  methods: {
      showDelBtn(row){
        return globalConf.game_match.statusOff == row.status && globalConf.game_match.notifyYes == row.notify;
      },
      showStatus(status){
          return globalConf.game_match.statusMap[status];
      },
      showOptStatus(status){
          if(status == globalConf.game_match.statusOn){
              return "下线";
          }else{
              return "上线";
          }
      },
      showNotify(status){
          console.log(status);
          return globalConf.game_match.notifyNo == status;
      },
      addClassStatus(status){
          if(status == globalConf.game_match.statusOn){
              return 'statusOn';
          }
          return 'statusOff';
      },
      fmtBody(value) {
          try {
              return JSON.parse(value);
          } catch (err) {
              return value;
          }
      },
      getStrByPos(name, len){
          return getStrPos(name, len);
      },
      gameIdChange(eventData){
          console.log(eventData);
          this.formData.game_id = eventData;
      },
      //条件搜索前端看此方法
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
              id: row.id,
          };
          let res;
          if(type == "notify"){
              res = await notify(sendData);
          }else{
              res = await updateGameMatchStatus(sendData);
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
           this.deleteGameMatches(row);
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
        const res = await deleteGameMatchesByIds({ ids })
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
    async updateGameMatches(row) {
      const res = await findGameMatches({ ID: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.reGameMatch;
        // this.formData.game_id = res.data.reGameMatch.game_id;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
          id:0,
          game_id:0,
          name:"",
          match_code:"",
          max_players:0,
          rule:"",
          timeout:0,
          fps:0,
          notify:0,
          status:0,
          
      };
    },
    async deleteGameMatches(row) {
      const res = await deleteGameMatches({ id: row.id });
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
      // const res = await getGameMatchOtherData();
      // if (res.code == 0) {
      //   this.statusTypeMap = res.data.statusTypeMap;
      //   this.notifyTypeMap = res.data.notifyTypeMap;
      // }
      // console.log("engineTypeMap", this.engineTypeMap)
      // console.log("gameTypeList", this.gameTypeList)
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
      switch (this.type) {
        case "create":
          res = await createGameMatches(this.formData);
          break;
        case "update":
          res = await updateGameMatches(this.formData);
          break;
        default:
          res = await createGameMatches(this.formData);
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
      this.dialogFormVisible = true;
    }
  },
  async created() {
    await this.getOtherData();
    await this.getTableData();
  
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
<style lang="scss">
    .table-expand {
        padding-left: 60px;
        font-size: 0;
        label {
            width: 90px;
            color: #99a9bf;
            .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 50%;
            }
        }
    }
    .popover-box {
        background: #112435;
        color: #f08047;
        height: 600px;
        width: 420px;
        overflow: auto;
    }
    .popover-box::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
</style>