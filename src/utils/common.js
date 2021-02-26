const basePath = process.env.VUE_APP_BASE_API;
export const getFullPath = (path) => {
    if(path == ""){
        return ;
    }
    if(path.indexOf("http") != -1){
        console.log("httttt");
        return basePath + path;
    }
    console.log("path=", path);
    return path;
}


export const deepClone = (obj) => {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}
