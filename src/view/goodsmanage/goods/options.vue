<template>
  <div>
    <div class="goods_opt">
      <el-form :model="formData" :rules="rules" ref="formData" label-position="right" label-width="90px">

          <el-form-item label="GameID:" prop="game_id">
              <game-select @changeGame="gameIdChange" :gameId="formData.game_id" />
          </el-form-item>

          <el-form-item label="标题:" prop="title">
              <el-input v-model="formData.title" clearable placeholder="请输入" ></el-input>
          </el-form-item>

          <el-form-item label="描述:" prop="description">
              <el-input type="textarea" placeholder="请输入" v-model="formData.description"></el-input>
          </el-form-item>

          <el-form-item label="展示图:" prop="icon">

              <el-col :span="12">
                  <el-upload
                          :action="`${hostPath}/fileUploadAndDownload/upload`"
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
                  <img :src="formData.icon" alt="" width="70px">
                  <img :src=" showUploadFile(formData.icon) " class="opt_banner_td img-responsive stu_icon">
              </el-col>

              <!--            <el-input v-model="formData.icon" clearable placeholder="请输入" ></el-input>-->
          </el-form-item>
       
         <el-form-item label="物品:" prop="items_id">
<!--            <el-input v-model="formData.items_id" clearable placeholder="请输入" ></el-input>-->
             <el-select
                     v-model="formData.items_id"
                     multiple
                     filterable
                     allow-create
                     default-first-option
                     placeholder="请选择标签">
                 <el-option
                         v-for="item in itemsIdOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                 </el-option>
             </el-select>
      </el-form-item>
       
         <el-form-item label="商品标签:" prop="tag_id">
             <game-tag @changeGame="gameTagChange" :gameId="formData.game_id" :tagId="formData.tag_id" />
<!--             <el-input v-model.number="formData.tag_id" clearable placeholder="请输入"></el-input>-->
      </el-form-item>
       

       
         <el-form-item label="币种:" prop="currency_id">
             <el-input v-model.number="formData.currency_id" clearable placeholder="请输入"></el-input>
      </el-form-item>
       
         <el-form-item label="价格:" prop="price">
            <el-input v-model="formData.price" clearable placeholder="请输入" ></el-input>
      </el-form-item>
       
         <el-form-item label="折扣:" prop="discount">
              <el-input-number v-model="formData.discount" :precision="2" clearable></el-input-number>
       </el-form-item>
       
<!--         <el-form-item label="上架状态:">-->
<!--             <el-input v-model.number="formData.sale" clearable placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->
<!--       -->
<!--         <el-form-item label="通知:">-->
<!--             <el-input v-model.number="formData.notify" clearable placeholder="请输入"></el-input>-->
<!--      </el-form-item>-->
       </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="enterDialog" type="primary">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

import {
    createGoods,
    updateGoods,
    findGoods,
} from "@/api/goods";  //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import { uploadTool } from "@/utils/upload";
import gameSelect from "@/components/gameSelect";
import gameTag from "@/components/gameTag";
import upload from "@/mixins/upload";
export default {
  name: "Goods",
  mixins: [upload],
  components: { gameSelect, gameTag },
  data() {
    return {
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
        itemsIdOptions:[],
        formData: {
            game_id:0,
            items_id:"",
            tag_id:0,
            icon:"",
            title:"",
            description:"",
            currency_id:0,
            price:"",
            discount:0,
            sale:0,
            notify:0,
            
      },
    rules: {
        game_id: [
            { required: true, message: '游戏不得为空', trigger: 'change' },
        ],
        items_id: [
            { required: true, message: '物品不得为空', trigger: 'change' },
        ],
        tag_id: [
            { required: true, message: '商品标签不得为空', trigger: 'change' },
        ],
        icon: [
            { required: true, message: '展示图不得为空', trigger: 'change' },
        ],
        title: [
            { required: true, message: '标题不得为空', trigger: 'change' },
            { min: 3, max: 20, message: '长度在 3-20 个字符以内', trigger: 'change' },
        ],
        description: [
            { required: true, message: '描述不得为空', trigger: 'change' },
            { min: 3, max: 200, message: '长度在 3-250 个字符以内', trigger: 'change' },
        ],
        currency_id: [
            { required: true, message: '币种不得为空', trigger: 'change' },
        ],
        price: [
            { required: true, message: '价格不得为空', trigger: 'change' },
        ],
        discount: [
            { required: true, message: '折扣不得为空', trigger: 'change' },
            { type: 'number', message: '折扣必须为数字', trigger: 'blur' },
        ],
    },
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
      gameIdChange(eventData){
          this.formData.game_id = eventData;
      },
      gameTagChange(eventData){
          this.formData.tag_id = eventData;
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
    async updateGoods(row) {
      const res = await findGoods({ ID: row.ID });
      this.type = "update";
      if (res.code == 0) {
        this.formData = res.data.regoods;
      }
    },
    closeDialog() {
        this.$router.go(-1);
    },
    async enterDialog() {
      let res;
      let postData = this.formData;
      postData.items_id = this.formData.items_id.toString();
      switch (this.type) {
        case "create":
          res = await createGoods(postData);
          break;
        case "update":
          res = await updateGoods(postData);
          break;
        default:
          res = await createGoods(postData);
          break;
      }
      if (res.code == 0) {
        this.$message({
          type:"success",
          message:"创建/更改成功"
        })
        this.closeDialog();
      }
    },
      checkFile(file) {
          return uploadTool.checkFile('stu_icon', file);
      },
      uploadSuccess(res) {
          this.fullscreenLoading = false;
          this.formData.icon = this.handleUploadRes(res);
      },
      async initPage(){
          if(this.$route.query.type == "update"){
              this.type = "update";
              const res = await findGoods({ id: this.$route.query.id });
              console.log("find-res", res);
              this.formData = res.data.regoods;
          }else{
              this.type = "create";
          }
          if(this.formData.items_id != ""){
            let option = this.formData.items_id.split(",");
            this.formData.items_id = option;
            if(option.length > 0) {
                for(let i=0; i< option.length; i++)
                {
                    let row = {
                        label: option[i],
                        value: option[i],
                    }
                    this.itemsIdOptions.push(row);
                }
            }
          }
      },

  },
   created() {
        this.initPage();
    }
};
</script>

<style scoped>
    .goods_opt{
        width:100%;
        max-width: 600px;
    }
</style>
