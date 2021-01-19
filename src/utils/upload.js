import { Message } from 'element-ui';
import { uploadConf } from "./uploadconf";

export const uploadTool = {

    checkFile(key, file){
        try{
            // this.fullscreenLoading = true;
            console.log(uploadConf);
            if(uploadConf.isTest == true){
                return true;
            }

            if(uploadConf['fileType'][key] == undefined){
                console.log("上传文件未定义");
                throw "上传文件未定义!";
            }

            const item = uploadConf['fileType'][key];
            const prefix = item['name'];
            const fileType = file.type;
            const isLt2M = file.size / 1024;
            console.log("文件大小为"+isLt2M+"kb");

            if(item['noLimit'] == true){
                console.log("上传文件不限制");
                return true;
            }
            if(item['alowType'].indexOf(fileType) < 0){
                console.log("上传文件格式错误");
                throw prefix+"格式错误!";
            }

            if(isLt2M<=0){
                console.log("大小不能为0");
                throw prefix+"大小不能为0!";
            }

            if(item['minSize'] != 0 && isLt2M < item['minSize']){
                console.log(prefix+"大小不能低于"+item['minSize']+"kb");
                throw prefix+"大小不能低于"+item['minSize']+"kb";
            }

            if(item['maxSize'] != 0 && isLt2M > item['maxSize']){
                console.log(prefix+"大小不能大于"+item['maxSize']+"kb");
                throw prefix+"大小不能大于"+item['maxSize']+"kb";
            }

            if(item['minWidth'] != 0 && isLt2M < item['minWidth']){
                console.log(prefix+"宽度不能低于"+item['minWidth']+"px");
                throw prefix+"宽度不能低于"+item['minWidth']+"px";
            }

            if(item['maxWidth'] != 0 && isLt2M > item['maxWidth']){
                console.log(prefix+"宽度不能大于"+item['maxWidth']+"px");
                throw prefix+"宽度不能大于"+item['maxWidth']+"px";
            }

            if(item['minHeight'] != 0 && isLt2M < item['minHeight']){
                console.log(prefix+"高度不能低于"+item['minHeight']+"px");
                throw prefix+"高度不能低于"+item['minHeight']+"px";
            }

            if(item['maxHeight'] != 0 && isLt2M > item['maxHeight']){
                console.log(prefix+"高度不能大于"+item['maxHeight']+"px");
                throw prefix+"高度不能大于"+item['maxHeight']+"px";
            }
            return true;
        }catch (e) {
            Message({
                showClose: true,
                message: e,
                type: 'error'
            });
            return false;
        }
    }

};
