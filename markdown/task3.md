###task3
####注意点：
1. reset总结：
ul有一个默认的margin-left:40px的样式。

2. box-sizing属性可以为三个值之一：

    + content-box（default）:width=content-width
    + border-box :width = cntent-width+padding+border-width
    + padding-box: width = cntent-width+padding

3. 清除浮动

**方法一**
``` 
兼容性：Firefox 3.5+, Safari 4+, Chrome, Opera 9+, IE 6+
.container:before,（1）
.container:after {
  content:"";
  display:table;
}
.container:after {
  clear:both;
}
.container {
  *zoom:1; /* For IE 6/7 (trigger hasLayout) */
}
```


补充：

* 设置成table，影响有两个：
    - 创建一个table-cell以及一个block-formatting-context。
    - top-margin可能会有collapse

    因此需要：before来消除这个问题，非必须，：after是用来清除浮动的

* 在现代浏览器中，可以不考虑before和zoom.

<hr>

**通常情况下，方法二**：

```
.container {
    overflow: hidden; /* Clearfix! */
    zoom: 1;  /* Triggering "hasLayout" in IE */
    display: block; /*一定要保证元素本身或者显示时是block，使得它能包裹住浮动的元素*/
}
或者
.container {
  display: inline-block;
  width: 100%;
  //前两者是create bfc
  zoom: 1; /* new block formatting context via hasLayout for IE 6/7 */
}

```

4. position:
- relative：在文档流。还是会保留它原先的位置，即使它通过top,left等被移动了。
- absolute: 脱离文档流，后续元素会覆盖上来。

####疑问点：
1. 之间的间隔不让用margin么，然后margin合并的问题。
2. hasLayout [hasLayout详解](http://www.satzansatz.de/cssd/onhavinglayout.html)
3. bfc:[demo](http://www.cssmojo.com/extras/clearfix_block-formatting-context_and_hasLayout/demo-4.html)

**answer**:

bfc（block formatting context）模式的元素会尽可能的去包裹住他内部的浮动元素，且外部的浮动不会影响内部的元素。

- 哪些可以create bfc:
    + 绝对定位元素(absolute/fixed)、浮动
    + inline-block（）
    + table-cell
    + table-captions(display:table-caption的)
    + 设置了overflow，且值非visible的元素
    + flex/inline-flex
display:table不会引起bfc。但是它会产生anonymous boxes，会导致display:table-cell.j结果触发bfc模式。

- ie中哪些可以trigger bfc:

    ![](http://i4.tietuku.cn/2ccbdd2d6ef26f0c.png)

- 有什么影响：

    - bfc可以阻止高度塌陷（*vertical方向*，如果两个box有margin，则会合并）
    但如果给父类设置成bfc，则不会collapse
    ![demo](http://i12.tietuku.cn/7db1be02f22f13e2.png)
    - bfc会尽可能一直包裹住内部的浮动元素
    
        ![demo](http://i12.tietuku.cn/712465a87992e487.png)
    
        第一幅图的父元素塌陷，因此背景色看不到，第二个block的父元素设置了overflow，因此浮动会被包裹住。

        **注意**：借助bfc清除浮动的时候，只对在同一个bfc内部的有效。
    
    - bfc不会覆盖浮动元素。即不受外部浮动元素的影响。此时如果要设置margin的话，一种是对左边元素设置margin-right：20px，另一种是对bfc设置margin：0 20px+float-width。如果父元素宽度不够float+bfc+margin的话，bfc会drop到下一行

4. ie下的main还是有问题
temp solution:
因为给main设置了bfc，因此他的margin不是相对于相邻的浮动元素的，而是相对于包裹的盒子的。因此margin要设置为0 140px 0 220px;
5. 还有边界的问题，以及logo旁边的文字,如果给img设置padding的话，float，然后title overflow，会高度上去，即塌陷，设置block会下来


####to read
1. [How To Clear Floats Without Structural Markup](http://www.positioniseverything.net/easyclearing.html)

2. [block-formatting-contexts](http://www.cssmojo.com/block-formatting-contexts/)

3. [Learn CSS Positioning in Ten Steps](http://www.barelyfitz.com/screencast/html-training/css/positioning/)

####参考文献
1. [A new micro clearfix hack](http://nicolasgallagher.com/micro-clearfix-hack/)

2. [Block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)

3. [clearfix](http://stackoverflow.com/questions/211383/which-method-of-clearfix-is-best)
