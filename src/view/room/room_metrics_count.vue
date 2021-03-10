<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="GameID">
          <game-select @changeGame="gameIdChangeSearch" :readOnly="gameSelectReadOnly" :gameId="searchInfo.game_id" />
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="searchInfo.day" clearable></el-date-picker>
        </el-form-item>          
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
          <el-button @click="resetSubmit" type="primary" plain>重置</el-button>
        </el-form-item>
        <el-form-item v-show="createShow">
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
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">{{scope.row.day|formatDate}}</template>
      </el-table-column>
    
    <el-table-column label="GameID" prop="game_id" width="120"></el-table-column>
    
    <el-table-column label="上行流量" prop="up_stream" width="120"></el-table-column> 
    
    <el-table-column label="下行流量" prop="down_stream" width="120"></el-table-column> 
    
    <el-table-column label="日活用户" prop="dau" width="120"></el-table-column> 
    
<!--      <el-table-column label="按钮组">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button class="table-button" @click="updateRoomMetrics(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>-->
<!--          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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

    <el-dialog :visible.sync="dialogCronjobVisible" title="更新数据">
      <el-form :model="jobFormData" label-position="right" label-width="80px">
        <el-form-item label="日期:">
          <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="jobFormData.day" clearable></el-date-picker>
        </el-form-item>

      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeCronjobDialog">取 消</el-button>
        <el-button @click="enterCronjobDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :before-close="closeDialog" :visible.sync="dialogFormVisible" title="弹窗操作">
      <el-form :model="formData" label-position="right" label-width="80px">
         <el-form-item label="GameID:"><el-input v-model.number="formData.game_id" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="日期:">
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.day" clearable></el-date-picker>
       </el-form-item>
       
         <el-form-item label="上行流量:"><el-input v-model.number="formData.up_stream" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="下行流量:"><el-input v-model.number="formData.down_stream" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="日活用户:"><el-input v-model.number="formData.dau" clearable placeholder="请输入"></el-input>
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
    createRoomMetrics,
    deleteRoomMetrics,
    deleteRoomMetricsByIds,
    updateRoomMetrics,
    findRoomMetrics,
    getRoomMetricsList,
    createRoomMetricsCountJob,
} from "@/api/room_metrics_count";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import gameSelect from "@/components/gameSelect";
import infoList from "@/mixins/infoList";
export default {
  name: "RoomMetrics",
  mixins: [infoList],
  components: { gameSelect },
  data() {
    return {
      createShow:false,
      listApi: getRoomMetricsList,
      dialogFormVisible: false,
      dialogCronjobVisible:false,
      gameSelectReadOnly:false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      jobFormData:{
        day:new Date(),
      },
      formData: {
            game_id:0,
            day:new Date(),
            up_stream:0,
            down_stream:0,
            dau:0,
            
      }
    };
  },
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd");
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
           this.deleteRoomMetrics(row);
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
        const res = await deleteRoomMetricsByIds({ ids })
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
    async updateRoomMetrics(row) {
      const res = await findRoomMetrics({ ID: row.id });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.rerMetrics;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
          game_id:0,
          day:new Date(),
          up_stream:0,
          down_stream:0,
          dau:0,
          
      };
    },
    closeCronjobDialog() {
        this.dialogCronjobVisible = false;
    },
    async enterCronjobDialog() {
        let res = await createRoomMetricsCountJob(this.jobFormData);
        if (res.code == 0) {
          this.$message({
            type:"success",
            message:"操作成功"
          })
          this.closeCronjobDialog();
          this.getTableData();
        }else{
          this.$message.error(res.msg);
        }

    },
    async deleteRoomMetrics(row) {
      const res = await deleteRoomMetrics({ ID: row.id });
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
          res = await createRoomMetrics(this.formData);
          break;
        case "update":
          res = await updateRoomMetrics(this.formData);
          break;
        default:
          res = await createRoomMetrics(this.formData);
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
      // this.type = "create";
      // this.dialogFormVisible = true;
      this.dialogCronjobVisible = true;
    }
  },
  async created() {
      this.createShow = await this.isHaveRights('/api/rightsCheck');
      await this.getTableData();
  
}
};
</script>

<style>
</style>
