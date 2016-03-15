####task1
#####一、总结
1. 命名字符参考（在html中有特殊意义的字符）

    * &gt; 表示大于符号">" (>)
    * &lt; 表示小于符号"<" (<)
    * &amp; 表示和符号"and"(&)
    * &quot; 表示引用符号" (")

    还可能有个main包裹住中间的。

2. 文章作者用address来表示，时间用time
3. 关于表单
    - for属性指定与label关联的元素的id
    - input 用id来与label呼应，用name来标识提交时是否传递该部分值，用type来区分类型，新的html5中增添了很多如email,range,datetime,password。
    - 长度限制，min,max是选择数字的，size用于规定大小，password的长度可以用pattern
    - radio,checkbox 的name一致才是一组元素

```html
<input pattern=".{3,}"   required title="3 characters minimum">
<input pattern=".{5,10}" required title="5 to 10 characters">
```
   
- 选中

```html
<label><input type="checkbox" checked="checked" name="hobbies" value="科学" />科学</label>
<option value="北京" selected="selected">北京</option>
```

- 文本框，cols,rows。 table中是colspan="2"这种
    
```
<textarea name="description" id="description" cols="20" rows="2" >
        这是一个多行输入框
</textarea>
```


#####二、需要关注的问题
1. table的border css
2. 用html缩进
3. 密码长度限制


<hr>

#####references
1. [html5-forms](http://www.sitepoint.com/html5-forms-markup/)
2. section 和div
> section和div的异同
> * section和div都可以对内容进行分块，但是section是进行有意义的分块，无意义的分块应该由div来做，例如用作设置样式的页面容器。
> * section内部必须有标题，标题也代表了section的意义所在。
