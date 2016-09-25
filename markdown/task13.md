####知识点
1.事件处理

- html事件处理程序
```
<input type="button" value="click" onclick="showMessage()"></input>
```

- DOM0级事件：//会在事件冒泡阶段被处理
```
btn.onclick=function(){...}
btn.onclick=null
可以通过this访问元素的任何属性和方法
```

- DOM2级事件：
```
btn.addEventListener("click",function(){...alert(this.id)},false)
btn.removeEventListener()
```
以队列的形式依次执行。但是匿名回调无法删除。
可以通过this访问元素的任何属性和方法
false表明在冒泡阶段处理

- IE事件处理：
```
btn.attachEvent("onclick",function(){
    ...注意此时的this是window，而不是所属元素
    })
btn.detachEvent()
```
区别：IE事件的执行顺序不是以添加顺序为基础，而是反向的。最后添加最先执行。

- **summary**:跨浏览器的事件处理：
```
var EventUtil = {
    addEvent:function(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);//DOM2
        }
        else if(ele.attachEvent){
            ele.attachEvent("on"+type,fn);    //IE
        }
        else{
            ele["on"+type] = fn;   //DOM0
        }
    },
    removeEvent:function(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn,false);//DOM2
        }
        else if(ele.detachEvent){
            ele.detachEvent("on"+type,fn);    //IE
        }
        else{
            ele["on"+type] = null;   //DOM0
        }
    }
}
```

2.事件对象
- DOM0级事件：
event.target(被实际触发的元素)
event.currentTarget(注册事件的元素，===this)
event.type
event.stopPropagation 
event.preventDefault 
event.phase **1：捕获阶段处理事件，2注册对象跟执行对象时一致的。3事件由触发的对象冒泡到上层被执行了**

- IE事件
event = window.event
event.srcElement（不一定===this）
event.returnValue(类似于dom中的取消默认操作preventDefault)
event.cancelBubble(类似于stopPropagation。但由于IE不支持事件捕获，因此只能取消事件冒泡，后者可以同时取消事件冒泡和捕获)

- 跨浏览器的事件对象
```
var EventUtil = {
    ...
    getEvent:function(event)
    {
        return event?event:window.event;
    },
     getTarget:function(event){
        return event.target?event.target:event.srcElement;
    },
    preventDefault:function(event){
       if(event.preventDefault){
        event.preventDefault();
       }else{
        event.returnValue = false;
       }
    },
    stopPropagation:function(event){
       if(event.stopPropagation){
        event.stopPropagation();
       }else{
        event.cancelBubble = true;
       }
    }
}
```

3. input的值用value获取
    4. <b></b>的中间值也是value