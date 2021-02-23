<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">

        <el-form-item label="GameID:">
          <!--             <el-input v-model.number="formData.game_id" clearable placeholder="请输入"></el-input>-->
          <game-select @changeGame="gameIdChangeSearch" :gameId="searchInfo.game_id" />
        </el-form-item>

        <el-form-item label="标签名称">
          <el-input placeholder="搜索条件" v-model="searchInfo.tag_name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
          <el-button @click="resetSubmit" type="primary" plain>重置</el-button>
        </el-form-item>
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
      stripe
      style="width: 100%"
      tooltip-effect="dark"
    >
    <el-table-column type="selection" width="55"></el-table-column>
    
    <el-table-column label="GameID" prop="game_id" width="120"></el-table-column>

      <el-table-column label="游戏名称" prop="game_name" width="120"></el-table-column>

      <el-table-column label="标签名称" prop="tag_name" width="120"></el-table-column>
    
    <el-table-column label="标签描述" prop="tag_label" width="120"></el-table-column> 
    
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button class="table-button" @click="updateGoodsTag(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>
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
          <game-select @changeGame="gameIdChange" :gameId="formData.game_id" />
        </el-form-item>
       
         <el-form-item label="标签名称:" prop="tag_name">
            <el-input v-model="formData.tag_name" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="标签描述:" prop="tag_label">
            <el-input v-model="formData.tag_label" clearable placeholder="请输入" ></el-input>
      </el-form-item>

        <el-form-item label="权重:" prop="weight">
          <el-input v-model.number="formData.weight" clearable placeholder="请输入"></el-input>
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
    createGoodsTag,
    deleteGoodsTag,
    deleteGoodsTagByIds,
    updateGoodsTag,
    findGoodsTag,
    getGoodsTagList
} from "@/api/goods_tag";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import gameSelect from "@/components/gameSelect";
import infoList from "@/mixins/infoList";
export default {
  name: "GoodsTag",
  mixins: [infoList],
  components: { gameSelect },
  data() {
    return {
      listApi: getGoodsTagList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
            game_id:0,
            tag_name:"",
            tag_label:"",
            weight:1,
      },
      rules: {
        game_id: [
          { required: true, message: '游戏ID不得为空', trigger: 'change' },
        ],
        tag_name: [
          { required: true, message: '名称', trigger: 'change' },
          { min: 1, max: 30, message: '长度在 1-30 个字符以内', trigger: 'change' },
        ],
        tag_label: [
          { required: true, message: '标识符', trigger: 'change' },
          { min: 1, max: 30, message: '长度在 1-30 个字符以内', trigger: 'change' },
        ],
        weight: [
          { required: true, message: '权重不得为空', trigger: 'change' },
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
           this.deleteGoodsTag(row);
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
        const res = await deleteGoodsTagByIds({ ids })
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
    async updateGoodsTag(row) {
      const res = await findGoodsTag({ id: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.reGTags;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
          game_id:0,
          tag_name:"",
          tag_label:"",
          
      };
    },
    async deleteGoodsTag(row) {
      const res = await deleteGoodsTag({ id: row.id });
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
      let res;
      switch (this.type) {
        case "create":
          res = await createGoodsTag(this.formData);
          break;
        case "update":
          res = await updateGoodsTag(this.formData);
          break;
        default:
          res = await createGoodsTag(this.formData);
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
