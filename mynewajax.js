// {name:"xionghui",age:18}
// name=xionghui&age=18
function resolveData(obj){
    var arr = [];
    for(key in obj){
        var str = key+"="+obj[key] // name=xionghui  age=18
        arr.push(str);
    }
    return arr.join('&')
}

console.log(resolveData({name:"xionghui",age:18}));

//method请求类型 data发送的参数 url请求的地址 success请求成功以后执行的回调函数
// $.ajax({
//     url:"",
//     method:""
// })
//该函数的参数是对象类型
function myajax(options){
    //创建ajax对象
    var xhr = new XMLHttpRequest();
    //把用户传递的对象参数转化成查询字符串
    var qs = resolveData(options.data);
    //判断用户的请求方式，执行不同操作 PUT DELETE
    if(options.method.toUpperCase() === "GET"){ //当请求方式为get时候执行
        xhr.open(options.method,options.url+"?"+qs);
        xhr.send();
    }else if(options.method.toUpperCase() === "POST"){ //当请求方式为post时候执行
        xhr.open(options.method,options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs);
    }
    xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            //xhr.responseText
            options.success(xhr.responseText)
        }
    }
}

myajax({
    method:"get",
    data:{id:1},
    url:"http://www.liulongbin.top:3006/api/getbooks",
    success:function(msg){
        console.log(msg,"--------")
        console.log(JSON.parse(msg))
    }
})