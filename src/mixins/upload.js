export default {
    data() {
        return {
            hostPath:process.env.VUE_APP_BASE_API,
            uploadPrex:process.env.VUE_APP_UPOAD_BASE_PRE,
        }
    },
    methods: {
        showUploadFile(file){
            if(file == "" || file == undefined) {
                return "";
            }
            if(file.indexOf("http") != -1){
                return file;
            }
            let fullPath = this.uploadPrex + file;
            return fullPath;
        },
        handleUploadRes(res){
            console.log(res);
            if (res.code == 0) {
                this.$message({
                    type: "success",
                    message: "上传成功"
                });
                return res.data.file.url;
            } else {
                this.$message({
                    type: "warning",
                    message: res.msg
                });
                return "";
            }
        },
        uploadError() {
            this.$message({
                type: "error",
                message: "上传失败"
            });
            this.fullscreenLoading = false;
        },
    }
}