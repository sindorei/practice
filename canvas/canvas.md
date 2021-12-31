# canvas
- canvas 元素默认 300*150
- 可通过`width`、`height`属性设置元素大小
- canvas元素实际上有两套尺寸
  * 元素本身的大小
  * 元素绘图表面（drawing surface）的大小
- 设置元素的width与height属性，实际同时修改了该元素本身的大小与元素绘图表面的大小
- 通过css来设定canvas元素的大小，只会改变元素本身的大小
- 当canvas元素的大小不符合其绘图表面的大小时，浏览器会对绘图表面进行缩放，使其符合元素的大小



# canvas元素的API