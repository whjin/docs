**容器属性**

|属性|说明|
|----|----|
|`flex-direction`|决定主轴的方向`row`、`row-reverse`、`column`、`colume-reverse`|
|`flex-wrap`|换行规则`nowrap`、`wrap`、`wrap-reverse`|
|`flex-flow`|简写`flex-direction`和`flex-wrap`，默认值为`row nowrap`|
|`justify-content`|水平主轴对齐方式|
|`align-items`|竖直轴对齐方式|

**元素/项目属性**

|属性|说明|
|---|----|
|`order`|元素的排列顺序，值越小，排列越靠前，默认为`0`|
|`flex-grow`|元素的放大比例|
|`flex-shrink`|元素的缩小比例，当空间不足的情况下会等比例的缩小，`flex-shrink`为`0`，则为不缩小|
|`flex-basis`|定义元素占据的空间|
|`flex`|`flex-grow`、`flex-shrink`、`flex-basis`简写，默认值为`0 1 auto`|
|`align-self`|允许单个元素与其他项目不一样的对齐方式，可以覆盖`align-items`，默认属性为`auto`，表示继承父元素的`align-items`，如果没有父元素，值为`stretch`|
