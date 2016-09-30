var $ = function(str){ return document.querySelector(str);}
var $$ = function(str){return document.querySelectorAll(str);}

var tagContainer = $(".tag-container");

function MockQueue(container,pretreat){
  this.container = container;
  this.queue = [];
  this.pretreat = pretreat;
  /**
  * 最开始的考虑过domQueue而不是queue，但是这样不好控制内部的data-index
  */
}

MockQueue.prototype = {
  validate:function(){
    var receivedArr = [];
    if(this.pretreat){
      receivedArr = (this.pretreat)();
      return receivedArr.map(function(data){
        return data.trim();
      });
    }

  },
  render:function(selectedArr){

    //方法二：传入highlight数组
    var updatedHTML = ``;
    this.queue.forEach(function(num,index){
      var temp =  `<span data-index='${index}'>${num}</span>`;
      if(selectedArr && selectedArr.length>0 && selectedArr.indexOf(index)!==-1)
        temp = `<span class='highlight' data-index='${index}'>点击删除${num}</span>`;
      updatedHTML += temp;
    });

    this.container.innerHTML = updatedHTML;
  },

  //思路：用hash来进行过滤
  removeDuplicate:function(arr){
    //
    var hashDict = {};
    arr.forEach(function(data){
      hashDict[data] = true;
    });
    return Object.keys(hashDict);
  },

  /**
  * removeDuplicate思路，可以合并后调用上面的removeDuplicate去去重，但是会有先后顺序的问题。即下面的删除没有办法保证先加入的先删除
  * 因此换用暴力方法，每插一个进来都去比较重复+数目限制
  */
  insert:function(){

    var inputArr = this.removeDuplicate(this.validate());

    inputArr = inputArr.filter(function(data){
      return data && this.queue.indexOf(data)===-1;
    }.bind(this));
    this.queue = this.queue.concat(inputArr).slice(0,10);

    // $("#queue-input").value = "";
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

  var tagContainer = $(".tag-container")
      interestContainer = $(".interest-container");

  var tagQueue = new MockQueue(tagContainer,addTag);
  var interestQueue = new MockQueue(interestContainer,addInterest);
  var selectedArr = [];

  addEvent();

  function addTag(){
    var tagInput = $(".queue-tag").value.trim();
    if(tagInput){
      console.log("this in tag",this);
      return tagInput.split(/[\s+,\n]/);
    }
  }

  function addInterest(){
    var interestInput = $("#queue-interest").value.trim();
        if(interestInput){
          return interestInput.split(/[\s+,\n]/);
        }
  }

  function removeFun(e,queue){
    var target = e.target;
    if(e.currentTarget.className.indexOf('container')!==-1){
      var curIndex = target.dataset.index;
      queue.removeTarget(curIndex);
    }
  }

  function addEvent(){

      var queueArr = [tagQueue,interestQueue];

      $$(".container").forEach(function(container,index){
        (function(i){
            container.addEventListener("click",function(e){
              removeFun(e,queueArr[i]);
            })
        })(index);


      })


      $(".tag-container").addEventListener("mouseover",function(e){
        var target = e.target;
        if(e.currentTarget.className.indexOf('container')!==-1){
          var curIndex = parseInt(target.dataset.index);
          var prevText = tagQueue[curIndex];

          selectedArr.push(curIndex);
          tagQueue.render(selectedArr);
          // e.target.className = "highlight";
          // e.target.innerHTML = "点击删除"+prevText;
        }
      });

      //空格，逗号，回车
      $(".queue-tag").addEventListener("keyup",function(e){
        var tagInput = $(".queue-tag").value;
        if(tagInput.search(/[\s+,\n]/)!==-1 || e.keyCode==13){
          tagQueue.insert();
          $(".queue-tag").value = "";
        }

      });
      $(".btn-query").addEventListener("click",function(e){
          interestQueue.insert();
          $("#queue-interest").value = "";
      });



  }






})($);