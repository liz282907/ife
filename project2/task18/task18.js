var $ = function(str){
  return document.querySelectorAll(str);
}

var tagContainer = $(".tag-container")[0];

function MockQueue(){
  this.queue = [];
  /**
  * 最开始的考虑过domQueue而不是queue，但是这样不好控制内部的data-index
  */
}

MockQueue.prototype = {
  validate:function(){
    var inputNum = $("#queue-input")[0].value;
    return inputNum.search(/\d+/)!=-1?inputNum:'invalid';
  },
  render:function(){

    var updatedHTML = ``;
    this.queue.forEach(function(num,index){
      updatedHTML += `<span class='tag' data-index='${index}'>${num}</span>`;
    });

    tagContainer.innerHTML = updatedHTML;
  },
  // createDom:function(num,index){
  //   // var span = document.createElement("span"),
  //   //   text = document.createTextNode(num);
  //   // span.appendChild(text);
  //   // return span;
  //   return `<span class='tag' data-index=${index}>${num}</span>`;

  // },
  insert:function(direction){

    var inputNum;
    if((inputNum = this.validate())==='invalid') {
      alert("请输入数字");
      return;
    }


    direction==="left"?this.queue.unshift(inputNum):this.queue.push(inputNum);

    $("#queue-input")[0].value = "";
    this.render();

  },
  remove:function(direction){
    if(this.queue.length<=0) return;
    direction==="left"?this.queue.shift():this.queue.pop();
    // direction==="left"?this.domQueue.shift():this.domQueue.pop();
    this.render();

  },
  removeTarget:function(index){
    this.queue.splice(index,1);
    this.render();
  }


};

(function($){

  var testQueue = new MockQueue();

  $(".enter-left")[0].addEventListener("click",function(){testQueue.insert("left")});
  $(".enter-right")[0].addEventListener("click",function(){testQueue.insert("right")});

  $(".exit-left")[0].addEventListener("click",function(){testQueue.remove("left")});
  $(".exit-right")[0].addEventListener("click",function(){testQueue.remove("right")});

/*
  思路一：可以在span生成的时候设置data-index属性，然后绑定到父的addevent的时候,获得e.target.dataSet.index
  然后去domQueue里面remove，需要注意的是因为有队头操作，因此index实际上是变动的
  思路二：遍历数组，给每个加event,但是需要考虑到每个新添加的元素其实没有绑定，也就是说增元素的时候是要重新绑定的
*/
  $(".tag-container")[0].addEventListener("click",function(e){
    var target = e.target;
    if(target.className==='tag'){
      var curIndex = target.dataset.index;
      testQueue.removeTarget(curIndex);
    }
  })
})($);