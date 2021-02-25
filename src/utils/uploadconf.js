export const uploadConf = {
    isTest:false,   //isTest==true 一律不限制
    fileType : {
        goods_icon:{
            noLimit : false,    //是否不限制
            name : "icon",
            alowType:[
                        'image/jpeg',
                        'image/png',
                     ],
            maxSize:    1255,
            minSize:    0,
            maxWidth:   1900,
            minWidth:   0,
            maxHeight:  800,
            minHeight:  0,
        },
    },
};
