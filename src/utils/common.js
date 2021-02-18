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

