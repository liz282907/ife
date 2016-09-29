/**
* 1，排序思路：
* 冒泡：i从1开始，左右两两比较，如果左<右，交换，swap = true;知道i到最右边，那么
* 最大排到了最右边。这一轮比较结束，如果swap===true,开启下一轮，i从1继续开始比较。比较范围缩小1个（因为最大值已经出来了。）
* 2，可视化思路：
* 设置一个interval去绘制，每次交换都render一遍当前序列。否则只执行就好。每次进interval的时候要判断是否已结束或者进入下一轮比较
*
*/
//todo: 颜色区分：
/*
1，已比较完的设颜色，当前在挪动的设颜色，未比较的设颜色
*/

var $ = function(str){return document.querySelector(str);};
var $$ = function(str){return document.querySelectorAll(str);};
var bubbleSortId;


var tagContainer = $(".tag-container");
var colorDict = {
  sorted:[],
  cur:0
};

function MockQueue(){
  this.queue = [];
  /**
  * 最开始的考虑过domQueue而不是queue，但是这样不好控制内部的data-index
  */
}

MockQueue.prototype = {
  validate:function(){
    //超过60
    if(this.queue.length>=60) {
      alert("队列元素最多为60个哟");
      return 'invalid';
    }


    var inputNum = $("#queue-input").value;
    if(inputNum.search(/\d+/)===-1 || parseInt(inputNum)<10 || parseInt(inputNum)>100)
      return 'invalid';
    return inputNum;
    // return inputNum.search(/\d+/)!=-1?inputNum:'invalid';
  },
  render:function(){

    var updatedHTML = ``;

    this.queue.forEach(function(num,index){

      var spanHtml = `<span style='height:${num+"px"}' data-index='${index}'></span>`;
      if(colorDict.sorted.indexOf(index)!==-1)
        spanHtml = `<span class='green' style='height:${num+"px"}' data-index='${index}'></span>`;
      if(colorDict.cur === index)
        spanHtml = `<span class='red' style='height:${num+"px"}' data-index='${index}'></span>`

      var curBox = spanHtml;
      updatedHTML += curBox;
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
      alert("请输入合法数字");
      return;
    }


    direction==="left"?this.queue.unshift(inputNum):this.queue.push(inputNum);

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

  generateRandomQueue:function(){
    for(var i=0;i<30;i++){
      this.queue.push(Math.random()*91+10);
    }
    this.render();
  },



  bubbleSort:function(){
    var swap  = false,that = this,firstRound = true;
    var arr = this.queue,
        i = 1,
        lastIndexOfNotSortedArr = arr.length-1;

    var interval = $(".input-interval").value;

    bubbleSortId = setInterval(_runSort,parseInt(interval));

    function _runSort(){
      if(!firstRound && !swap && i>lastIndexOfNotSortedArr) {
        clearInterval(bubbleSortId);


        colorDict.sorted = new Array().generateArr(0,29);
        that.render();

      }

      firstRound = false;

      if(i>lastIndexOfNotSortedArr){
        //render 拍好的
        colorDict.sorted.push(lastIndexOfNotSortedArr);

        i=1;
        lastIndexOfNotSortedArr-=1;
        swap = false;
      }

      if(arr[i-1]>arr[i]){

        arr.swap(i-1,i);
        swap = true;
        that.render();
      }
      colorDict.cur = i;
      i++;


    }
/*
    function _runSort(){
        do{
            swap = false;
            for(var i=1;i<=lastIndexOfNotSortedArr;i++){
              if(arr[i-1]>arr[i])
              {

                // var temp = arr[i];
                // arr[i] = arr[i-1];
                // arr[i-1] = temp;

                arr.swap(i-1,i);
                swap = true;
                //
                console.log("this ",that);
                //注意，这边的this指window
                that.render();
              }
            }
            lastIndexOfNotSortedArr -=1;
          }while(swap)
          util.clearInterval(bubbleSortId);

    };

*/

  }


};

Array.prototype.swap = function(lIndex,rIndex){
  var temp = this[rIndex];
    this[rIndex] = this[lIndex];
    this[lIndex] = temp;
    return this;
};
Array.prototype.generateArr = function(start,end){
  var result = [];
  for(var i=start;i<=end;i++){
    result.push(i);
  }
  return result;
};

var util = {
  clearInterval:function(id){
    clearInterval(id);
  }
};

(function($){

  var testQueue = new MockQueue();

  $(".enter-left").addEventListener("click",function(){testQueue.insert("left")});
  $(".enter-right").addEventListener("click",function(){testQueue.insert("right")});

  $(".exit-left").addEventListener("click",function(){testQueue.remove("left")});
  $(".exit-right").addEventListener("click",function(){testQueue.remove("right")});

  $(".sort-bubble").addEventListener("click",function(){testQueue.bubbleSort()});
  $(".random-queue").addEventListener("click",function(){testQueue.generateRandomQueue()});;

  $(".btn-pause").addEventListener("click",function(){
    clearInterval(bubbleSortId);
  });
  $(".btn-resume").addEventListener("click",function(){
    testQueue.render();
    testQueue.bubbleSort();
  });

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
  });


})($);