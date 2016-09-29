var $ = function(str){ return document.querySelector(str);}
var $$ = function(str){return document.querySelectorAll(str);}

var tagContainer = $(".tag-container");

function MockQueue(){
  this.queue = [];
  /**
  * 最开始的考虑过domQueue而不是queue，但是这样不好控制内部的data-index
  */
}

MockQueue.prototype = {
  validate:function(){
    var inputStr = $("#queue-input").value.trim();

    var newArr = inputStr.split(/[^\da-zA-Z\u4E00-\u9FA5]+/);
    return newArr;
  },
  render:function(selectedArr){

    //方法二：传入highlight数组
    var updatedHTML = ``;
    this.queue.forEach(function(num,index){
      var temp =  `<span data-index='${index}'>${num}</span>`;
      if(selectedArr && selectedArr.length>0 && selectedArr.indexOf(index)!==-1)
        temp = `<span class='highlight' data-index='${index}'>${num}</span>`;
      updatedHTML += temp;
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

    var inputArr = this.validate();

    this.queue = (direction==="left"? inputArr.concat(this.queue):this.queue.concat(inputArr));

    $("#queue-input").value = "";
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
  },

  hightlightFiltered:function(filterWord){
    var highlightIndex = [];
    this.queue.forEach(function(data,index){
      if(data.indexOf(filterWord)!==-1)
          highlightIndex.push(index);
      });
    this.render(highlightIndex);


  /**
  * 这是一种方法，但实际上不是很好，因为频繁在操作dom，更好的是用html整个替换

    $$(".tag-container span").forEach(function(el,index){
      if(highlightIndex.indexOf(index)!==-1){
        el.className = 'highlight';
      }else
      el.className = '';
    })

    */

  }


};

(function($){

  var testQueue = new MockQueue();

  $(".enter-left").addEventListener("click",function(){testQueue.insert("left")});
  $(".enter-right").addEventListener("click",function(){testQueue.insert("right")});

  $(".exit-left").addEventListener("click",function(){testQueue.remove("left")});
  $(".exit-right").addEventListener("click",function(){testQueue.remove("right")});

  $(".btn-query").addEventListener("click",function(){

    var filterWord = $(".queue-query").value;
    testQueue.hightlightFiltered(filterWord);

  })
/*
  思路一：可以在span生成的时候设置data-index属性，然后绑定到父的addevent的时候,获得e.target.dataSet.index
  然后去domQueue里面remove，需要注意的是因为有队头操作，因此index实际上是变动的
  思路二：遍历数组，给每个加event,但是需要考虑到每个新添加的元素其实没有绑定，也就是说增元素的时候是要重新绑定的
*/
  $(".tag-container").addEventListener("click",function(e){
    var target = e.target;
    if(target.className==='tag'){
      var curIndex = target.dataset.index;
      testQueue.removeTarget(curIndex);
    }
  })
})($);