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