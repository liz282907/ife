####总结
#####part1 切图
1. ps快捷键
- 放大缩小：alt+滚轮 ctrl+"+" ；100%缩放：ctrl+"1"
- 参考线： ctrl+";"
2. 测量： 矩形选框，测量时一定要尽可能的放大视图
3. 右键查看图层样式，里面有透明度

#####part2 css

1. 顺序：font-style | font-variant | font-weight | font-size | line-height | font-family
2. ul也是块级元素，nav中时有时候需要设置为inline-block
3. background-size:cover需要在background设置后再设置才有效
4. absolute 使得层级高，遮挡住本来在它后面的input的底色，因此需要给input加上position：relative，具体原理待资料查看。
5. select需要给一个name属性
6. 注意被设为absolute的元素的宽度是内容宽度，且如果不设置left,top的话，位置是原内容位置，也就是说会考虑padding这些。
7. 中文的文字间隔也是用letter-spacing：中   国   ，英文
的是 l e t t e r,word-spacing是 this is letter example.
8. 小箭头，可以用绝对定位+伪元素：before,:after来实现。（注意float+overflow:hidden的布局中不能把伪元素加在overflow的部分上面哟，会被hidden掉哈哈）
9. 下拉菜单布局** div(focus,relative)+ul(absolute)**
    - 需要设置tabindex才会使focus生效，
    - 选中时默认会有蓝色边框，此时用outline:none去除即可
    - 平时display:none/visibility:hidden，当focus的时候display:block或者visibility：visible
```
.selection-item:focus{
                outline: none; //!important
                border: 1px solid #be4e48;
                .dropdown{
                    display: block;
                    border: 1px solid #be4e48;
                    // visibility: visible;
                    li:hover{
                        background-color: #be4e48;
                    }
                }
            }

```

```

补充：
1. tabindex属性值的是有一定含义的:
* -1: 用户不能通过tab的方式达到该元素, 只允许通过编程方式来获得focus(element.focus()), 或者就是点击获得focus.
* 0: 用户可以通过tab的方式达到该元素, 自动定义tab的顺序.
* >0: 给元素一个指定的tab优先级, 等于1时优先级最高.
2. 关于为什么用div代替select select可以改样式，只要appearance：none即可，但是option除了background-color,color，font-size可以变，其他任何css样式都没有办法更改。
```

10. 伪元素的content
content:attr(data)

11.background 属性 类padding-right属性（css）
right 10px center

12.当hover的时候，背景从下往上slide-up
```
box-shadow:inset x-offset y-offset blur-radius spread-radius color
&:hover{
        box-shadow:inset 0 -100px 0 0 #e74f4d;
        a{color: #fff};
        transition: all 800ms;
        -webkit-transition:all 800ms;
    }
```
#####part3 问题
1. font-family不继承
2. p 换行，max-width
3. p border-right，且颜色不一致。padding也有问题。且不能用border-right，因为数量不对。
    暂时的解决方案：
    设置一个 line,绝对定位到right，bottom，设置宽高填充色。
4. 为什么img下面还有一点间隙
5. search那部分的下拉箭头的布局除了绝对定位还有别的方法么。
6. select的placeHolder问题。暂时的解决方案：
```
<select placeholder="城市">
    <option value="" disabled selected>城市</option>
</select>
```

7.submit按钮上字的间距
8. 下拉菜单的布局《li》<img>北京市以及选中
9. text-align:center与letterspacing的conflit:
原因：因为实际上浏览器是从第一个字开始每个加一个letter-spacing，最后一个字也是有间距的。如图
![](http://7xrn7f.com1.z0.glb.clouddn.com/16-3-22/14486024.jpg)
解决：
```
container{text-align:center;}
container h2{
                margin-right: -3em;
                letter-spacing: 3em;
}
或者
container h2{
                padding-left:3em;
                letter-spacing: 3em;
}
```

10.文字到底是用font-size+line-height呢还是用font-size+padding呢？

11.（新世界左右两个部分，中间有三角形那个任务）有没有一种方法（除了table和flex）使得左右自适应等高，且左固定，右自适应，上下左右居中？
    
    现在的方案是：
    左固定，右自适应：flex+overflow
    上下左右居中：右边内部内容一个固定宽高，父元素flex+align-items+justify-content
    等高：左右均padding-bottom:9999,margin-bottom:-9999,父overflow:hidden
    阻碍是：现在的右边的高度实际上是内容高度（固定个）。
    #####part4 各部分思路

1. activities:
```
part1
总体：padding-top，padding-bottom +text-align:center
内部：margin-top, img(inline-block)
part2
text-align:center
container,定宽+margin:auto，保持内部居中，
内部：padding-top,(有一个绝对定位)
select:flex+margin-left保持有间距居中
```


![](http://i12.tietuku.cn/b71cc8f5f1ff9514.png)

#####part5 to do
1. 层级提升（relative）

[伪元素](http://blog.jobbole.com/49301/)
[blog](http://www.w3cplus.com/blogs/airen?page=3)
