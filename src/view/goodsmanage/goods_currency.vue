<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
<!--        <el-form-item label="GameID">-->
<!--          <el-input placeholder="搜索条件" v-model="searchInfo.game_id"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="GameID:">
          <!--             <el-input v-model.number="formData.game_id" clearable placeholder="请输入"></el-input>-->
          <game-select @changeGame="gameIdChangeSearch" :gameId="searchInfo.game_id" />
        </el-form-item>

<!--        <el-form-item label="货币名称">-->
<!--          <el-input placeholder="搜索条件" v-model="searchInfo.name"></el-input>-->
<!--        </el-form-item>      -->
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
          <el-button @click="resetSubmit" type="primary" plain>重置</el-button>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="top" v-model="deleteVisible" width="160">
            <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click="deleteVisible = false" size="mini" type="text">取消</el-button>
                <el-button @click="onDelete" size="mini" type="primary">确定</el-button>
              </div>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      ref="multipleTable"
      style="width: 100%"
      tooltip-effect="dark"
    >
<!--    <el-table-column type="selection" width="55"></el-table-column>-->

      <el-table-column label="ID" prop="id" width="80"></el-table-column>

      <el-table-column label="GameID" prop="game_id" width="120"></el-table-column>

      <el-table-column label="游戏名称" prop="game_name" width="120">
        <template slot-scope="scope">{{ showGameName(scope.row.game_name) }}</template>
      </el-table-column>

    
    <el-table-column label="货币名称" prop="name" width="120"></el-table-column> 
    
    <el-table-column label="货币标识符" prop="label" width="120"></el-table-column> 
    
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button class="table-button" @click="updateGoodsCurrency(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)">删除</el-button>
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


        <el-form-item label="GameID:" prop="game_id">
          <!--             <el-input v-model.number="formData.game_id" clearable placeholder="请输入"></el-input>-->
          <game-select @changeGame="gameIdChange" :gameId="formData.game_id" />
        </el-form-item>
       
         <el-form-item label="货币名称:" prop="name">
            <el-input v-model="formData.name" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="货币标识符:" prop="label">
            <el-input v-model="formData.label" clearable placeholder="请输入" ></el-input>
      </el-form-item>
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
    createGoodsCurrency,
    deleteGoodsCurrency,
    deleteGoodsCurrencyByIds,
    updateGoodsCurrency,
    findGoodsCurrency,
    getGoodsCurrencyList
} from "@/api/goods_currency";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import gameSelect from "@/components/gameSelect";
import infoList from "@/mixins/infoList";
export default {
  name: "GoodsCurrency",
  mixins: [infoList],
  components: { gameSelect },
  data() {
    return {
      listApi: getGoodsCurrencyList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
            id:0,
            game_id:0,
            name:"",
            label:"",
            
      },
    rules: {
        game_id: [
            { required: true, message: '游戏ID不得为空', trigger: 'change' },
        ],
        name: [
            { required: true, message: '货币名称', trigger: 'change' },
            { min: 2, max: 30, message: '长度在 3-30 个字符以内', trigger: 'change' },
        ],
        title: [
            { required: true, message: '货币标识符', trigger: 'change' },
            { min: 2, max: 30, message: '长度在 3-30 个字符以内', trigger: 'change' },
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
      //条件搜索前端看此方法
      onSubmit() {
        this.page = 1
        this.pageSize = 10       
        this.getTableData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      deleteRow(row){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.deleteGoodsCurrency(row);
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
            ids.push(item.id)
          })
        const res = await deleteGoodsCurrencyByIds({ ids })
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
    async updateGoodsCurrency(row) {
      const res = await findGoodsCurrency({ ID: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.reGoodscurreny;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
          game_id:0,
          name:"",
          label:"",
          
      };
    },
    async deleteGoodsCurrency(row) {
      const res = await deleteGoodsCurrency({ id: row.id });
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
    async enterDialog() {
        let res = {};
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
          res = await createGoodsCurrency(this.formData);
          break;
        case "update":
          res = await updateGoodsCurrency(this.formData);
          break;
        default:
          res = await createGoodsCurrency(this.formData);
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
    await this.getTableData();
  
}
};
</script>

<style>
</style>
