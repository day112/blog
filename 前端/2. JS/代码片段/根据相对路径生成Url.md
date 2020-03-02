## 根据相对路径生成URL

```js
///根据相对路径得到完整URL
///strUrl:URL相对地址
var GetPath = function (strUrl) {
    if (strUrl.toLowerCase().indexOf("https:") != -1 || strUrl.toLowerCase().indexOf("http:") != -1 || strUrl.toLowerCase().indexOf("file:") != -1) {
        return strUrl;
    }

    var strHref = window.location.href.split("/")[0] + "//" + window.location.host;
    if (strUrl.indexOf("/") == 0 || strUrl.indexOf("~/") == 0) {
        strUrl = strHref + strUrl.replace("~/", "/");
    }
    else {
        var arrHref = window.location.pathname.split("/");//获取当前的相对路径级

        var intBackNum = 1;
        //对../进行退级计算
        var strBack = "../";
        while (strUrl.indexOf(strBack) == 0) { //退回上一级目录
            strBack += strBack;
            intBackNum++;
        }
        //减去多余的../符
        if (intBackNum > 1) {
            strBack = strBack.replace("../", "");
        }
        strUrl = strUrl.replace(strBack, "");//替换退格符
        arrHref.length = arrHref.length - intBackNum;//减去路径级

        var strPath = arrHref.join("/");//组成路径
        var strSpace = (strPath.length == 0 ? "" : "/");
        strUrl = strHref + "/" + strPath + strSpace + strUrl;
    }
    return strUrl;
};
```



