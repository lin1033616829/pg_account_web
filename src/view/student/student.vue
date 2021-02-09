<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input placeholder="搜索条件" v-model="searchInfo.name"></el-input>
        </el-form-item>    
        <el-form-item label="年龄">
          <el-input placeholder="搜索条件" v-model="searchInfo.age"></el-input>
        </el-form-item>      
            <el-form-item label="性别" prop="sex">
            <el-select v-model="searchInfo.sex" clear placeholder="请选择">
                <el-option
                    key="true"
                    label="是"
                    value="true">
                </el-option>
                <el-option
                    key="false"
                    label="否"
                    value="false">
                </el-option>
            </el-select>
            </el-form-item>   
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="openDialog" type="primary">新增student</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="top" v-model="deleteVisible" width="160">
            <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button @click="deleteVisible = false" size="mini" type="text">取消</el-button>
                <el-button @click="onDelete" size="mini" type="primary">确定</el-button>
              </div>
            <el-button icon="el-icon-delete" size="mini" slot="reference" type="danger">批量删除</el-button>
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
    <el-table-column label="日期" width="180">
         <template slot-scope="scope">{{scope.row.CreatedAt|formatDate}}</template>
    </el-table-column>
    
    <el-table-column label="名称" prop="name" width="120"></el-table-column> 
    
    <el-table-column label="年龄" prop="age" width="120"></el-table-column> 

    <el-table-column label="头像" min-width="50">
        <img slot-scope="scope" :src=" showIcon(scope.row.icon) " class="opt_banner_td img-responsive stu_icon">
    </el-table-column>
    
    <el-table-column label="性别" prop="sex" width="120">
         <template slot-scope="scope">{{scope.row.sex|formatBoolean}}</template>
    </el-table-column>
    
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button class="table-button" @click="updateStudent(scope.row)" size="small" type="primary" icon="el-icon-edit">变更</el-button>
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
      <el-form :model="formData" label-position="right" label-width="80px">
         <el-form-item label="名称:">
            <el-input v-model="formData.name" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="年龄:"><el-input v-model.number="formData.age" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="头像:">

             <el-col :span="12">
                 <el-upload
                         :action="`${path}/fileUploadAndDownload/upload`"
                         :before-upload="checkFile"
                         :headers="{ 'x-token': token }"
                         :on-error="uploadError"
                         :on-success="uploadSuccess"
                         :show-file-list="false"
                 >
                     <el-button size="small" type="primary">点击上传</el-button>
                     <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                 </el-upload>
             </el-col>
             <el-col :span="12">
                 <upload-image v-model="formData.icon" />
                 <img :src=" showIcon(formData.icon) " class="opt_banner_td img-responsive stu_icon">
             </el-col>

<!--            <el-input v-model="formData.icon" clearable placeholder="请输入" ></el-input>-->
      </el-form-item>
       
         <el-form-item label="性别:">
            <el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" v-model="formData.sex" clearable ></el-switch>
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
    createStudent,
    deleteStudent,
    deleteStudentByIds,
    updateStudent,
    findStudent,
    getStudentList
} from "@/api/student";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import { uploadTool } from "@/utils/upload";
import { getFullPath } from "@/utils/common";
import infoList from "@/mixins/infoList";
import {mapGetters} from "vuex";
const path = process.env.VUE_APP_BASE_API;
export default {
  name: "Student",
  mixins: [infoList],

  data() {
    return {
        path: path,
      listApi: getStudentList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
        formData: {
            name:"",
            age:0,
            icon:"",
            sex:false,
            
      }
    };
  },
    computed: {
        ...mapGetters("user", ["userInfo", "token"])
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
      showIcon(icon){
          if(icon.indexOf("http") != -1){
              console.log("httttt", icon);
              return icon;
          }
        let fullPath = this.path + icon;
        console.log(icon);
        return fullPath;
      },
      //条件搜索前端看此方法
      onSubmit() {
        this.page = 1
        this.pageSize = 10         
        if (this.searchInfo.sex==""){
          this.searchInfo.sex=null
        }      
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
           this.deleteStudent(row);
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
        const res = await deleteStudentByIds({ ids })
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
    async updateStudent(row) {
      const res = await findStudent({ ID: row.ID });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.restudent1;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
          name:"",
          age:0,
          icon:"",
          sex:false,
          
      };
    },
    async deleteStudent(row) {
      const res = await deleteStudent({ ID: row.ID });
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
          res = await createStudent(this.formData);
          break;
        case "update":
          res = await updateStudent(this.formData);
          break;
        default:
          res = await createStudent(this.formData);
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
      checkFile(file) {
          return uploadTool.checkFile('stu_icon', file);
      },
      uploadSuccess(res) {
          this.fullscreenLoading = false;
          console.log(res);
          if (res.code == 0) {
              this.$message({
                  type: "success",
                  message: "上传成功"
              });
              this.formData.icon = res.data.file.url;
              if (res.code == 0) {
                  // this.getTableData();
              }
          } else {
              this.$message({
                  type: "warning",
                  message: res.msg
              });
          }
      },
      uploadError() {
          this.$message({
              type: "error",
              message: "上传失败"
          });
          this.fullscreenLoading = false;
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
    .stu_icon{
        width:50px;
        height:50px;
    }
</style>
