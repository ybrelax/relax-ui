## 一款基于vue的ui组件

## Installation
```
npm i yab-ui -S
```

### popup 弹出层

  arguments:

   position 弹出框得位置

  <yab-popup v-model = "show" position = "right"> </yab-popup>

  show: boolean (true: 显示， false：隐藏)
  

### loading 加载
   use：

    开启： 
    this.$loading.show({
      text: '你的文本内容'
    })

    关闭
    this.$loading.hide()


  