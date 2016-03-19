####总结

1. 经测试，浏览器渲染的时候，html和body元素的height都不是百分百高度的。只要给html设置10%高度，那么后续的子元素的百分比高度就可以生效，body也可以与浏览器高度一致。

```
body,html{
     height: 100%;
     width: 100%;
}
```

2,居中有三种方法

- 方法一: **transform+absolute**

```
.parent{
    position:relative;
}
.child{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
}
```

- 方法二:  **flex**

```
.parent{
    display: flex;
    justify-content:center;
    align-items:center;
}
```

- 方法三: **table-cell+vertical-align**，

兼容性：ie8及以上支持
设置了table-cell及vertical的元素，他的子元素会垂直居中。
```
.parent's parent{
    display:table;
}
.parent{
    display:table-cell;
    vertical-align:middle
}

另一种替代的方法，用**伪类+inline-block+vertical**
/* This parent can be any width and height */
.block {
  text-align: center;

  /* May want to do this if there is risk the container may be narrower than the element inside */
  white-space: nowrap;
}
 
/* The ghost, nudged to maintain perfect centering */
.block:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -0.25em; /* Adjusts for spacing */
}

/* The element to be centered, can also be of any width and height */ 
.centered {
  display: inline-block;
  vertical-align: middle;
  width: 300px;
}

```


####reading material summary

1. [HTML和CSS高级指南之二——定位详解](http://www.w3cplus.com/css/advanced-html-css-lesson2-detailed-css-positioning.html)
不设置z-index的时候，后面的元素在前面的元素的上方。设置的话，数字越大越接近人。

2. [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)

####比较有意思的网站

1.[一个根据center需求生成code的网站](http://howtocenterincss.com/#contentType=text&content.text.lines=5&horizontal=center&vertical=middle&browser.IE=6)

2. css-tricks

3. [一个利用伪类使得图片浮于文字中间的案例](https://css-tricks.com/float-center/)
