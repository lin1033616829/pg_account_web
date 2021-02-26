import { getDict } from "@/utils/dictionary";
export default {
    data() {
        return {
            hostPath:process.env.VUE_APP_BASE_API,
            // uploadPrex:process.env.UPOAD_BASE_PRE,
            uploadPrex:"http://chukong.oss-cn-qingdao.aliyuncs.com",
            page: 1,
            total: 10,
            pageSize: 10,
            tableData: [],
            searchInfo: {}
        }
    },
    methods: {
        filterDict(value, type) {
            const rowLabel = this[type + "Options"] && this[type + "Options"].filter(item => item.value == value)
            return rowLabel && rowLabel[0] && rowLabel[0].label
        },
        async getDict(type) {
            const dicts = await getDict(type)
            this[type + "Options"] = dicts
            return dicts
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getTableData()
        },
        async getTableData(page = this.page, pageSize = this.pageSize) {
            const table = await this.listApi({ page, pageSize, ...this.searchInfo })
            if (table.code == 0) {
                this.tableData = table.data.list
                this.total = table.data.total
                this.page = table.data.page
                this.pageSize = table.data.pageSize
            }
        },
        showGameName(name){
            if(name == ""){
                return '-';
            }
            return name;
        },
        gameIdChange(eventData){
            this.formData.game_id = eventData;
        },
        gameIdChangeSearch(eventData){
            this.searchInfo.game_id = eventData;
        },
        resetSubmit(){
            this.searchInfo = {};
            this.onSubmit();
        },
        showUploadFile(file){
            if(file == "" || file == undefined) {
                return "";
            }
            if(file.indexOf("http") != -1){
                return file;
            }
            let fullPath = this.uploadPrex + file;
            console.log(fullPath);
            return fullPath;
        },
    }
}