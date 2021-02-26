<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="GameID">
          <game-select @changeGame="gameIdChangeSearch" :gameId="searchInfo.game_id" />
        </el-form-item>                        
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
          <el-button @click="resetSubmit" type="primary" plain>重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增商品</el-button>
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

      <el-table-column label="展示图" prop="icon" width="120">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" :fit="fil" :src="showUploadFile(scope.row.icon)"></el-avatar>
        </template>
      </el-table-column>

      <el-table-column label="GoodsID" prop="goods_id" width="120"></el-table-column>

      <el-table-column label="标题" prop="title" width="120"></el-table-column>

      <el-table-column label="GameID" prop="game_id" width="120"></el-table-column>

      <el-table-column label="游戏名称" prop="game_name" width="120"></el-table-column>
    
    <el-table-column label="物品" prop="items_id" width="120"></el-table-column> 
    
    <el-table-column label="商品标签" prop="tag_name" width="120"></el-table-column>

      <el-table-column label="币种" prop="gc_name" width="120"></el-table-column>



      <!--    <el-table-column label="描述" prop="description" width="120"></el-table-column> -->

<!--    <el-table-column label="价格" prop="price" width="120"></el-table-column> -->
<!--    -->
<!--    <el-table-column label="折扣" prop="discount" width="120"></el-table-column> -->
<!--    -->
        <el-table-column label="上架状态" prop="sale" width="120">
          <template slot-scope="scope">
            <div :class="addClassStatus(scope.row.sale)">{{ showSaleStatus(scope.row.sale) }}</div>
          </template>
        </el-table-column>
<!--    <el-table-column label="通知" prop="notify" width="120"></el-table-column> -->

      <el-table-column label="更新日期" width="180">
        <template slot-scope="scope">{{scope.row.updated_at|formatDate}}</template>
      </el-table-column>
    
      <el-table-column label="按钮组" width="250">
        <template slot-scope="scope">
          <el-button class="table-button" @click="updateGoods(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>
          <el-button class="table-button" size="small" type="warning" icon="el-icon-switch-button" @click="updOpt(scope.row, 'sale')">{{ showOptSaleStatus(scope.row.sale) }}</el-button>
          <el-button type="success" icon="el-icon-s-promotion" size="mini" v-show="showNotify(scope.row.notify)" @click="updOpt(scope.row)">通知</el-button>
          <el-button type="danger" icon="el-icon-delete" v-show="showDelBtn(scope.row)" size="mini" @click="deleteRow(scope.row)">删除</el-button>
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

  </div>
</template>

<script>
import {
    deleteGoods,
    deleteGoodsByIds,
    getGoodsList,
    notify,
    updateGoodsSaleStatus,
} from "@/api/goods";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import { globalConf } from "@/utils/global/global";
import gameSelect from "@/components/gameSelect";
import infoList from "@/mixins/infoList";
export default {
  name: "Goods",
  mixins: [infoList],
  components: { gameSelect },
  data() {
    return {
      fil:"fill",
      listApi: getGoodsList,
      deleteVisible: false,
      multipleSelection: [],

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
        return globalConf.goods.saleStatusOff == row.sale && globalConf.goods.notifyYes == row.notify;
      },
      showSaleStatus(status){
          return globalConf.goods.saleStatusMap[status];
      },
      addClassStatus(status){
        if(status == globalConf.goods.saleStatusOn){
          return 'statusOn';
        }
        return 'statusOff';
      },
      showNotify(status){
        console.log(status);
        return globalConf.goods.notifyNo == status;
      },
      showOptSaleStatus(status){
        if(status == globalConf.goods.saleStatusOn){
          return "下线";
        }else{
          return "上线";
        }
      },
    async updOpt(row, type="notify"){
      let sendData = {
        id: row.id,
      };
      let res;
      if(type == "notify"){
        res = await notify(sendData);
      }else{
        res = await updateGoodsSaleStatus(sendData);
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
           this.deleteGoods(row);
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
        const res = await deleteGoodsByIds({ ids })
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
    async updateGoods(row) {
        this.$router.push({ name:'goods_opt', query: { type:"update", id:row.id }});
    },
    async deleteGoods(row) {
      const res = await deleteGoods({ ID: row.id });
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
    openDialog() {
      this.$router.push({ name:'goods_opt', query: { type:"create" }});
    }
  },
  async created() {
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