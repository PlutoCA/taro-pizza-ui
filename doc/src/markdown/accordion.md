# Accordion 手风琴

---

可以折叠 / 展开的内容区域。

## 使用指南

在 Taro 文件中引入组件

```js
import { PiAccordion } from 'pizza-ui'
```

**组件依赖的样式文件（仅按需引用时需要）**


## 用法

```html
<PiAccordion title="标题" text='文字'>
  <View>
    content
  </View>
</PiAccordion>
```

## Area 参数

| 参数         | 说明                                    | 类型            | 可选值           | 默认值 |
|:-------------|:----------------------------------------|:----------------|:-----------------|:-------|
| title      | 手风琴标题                  | string         | -                | -  |
| text       | 靠右的额外文字              | string         | -                | -  |
| open       | 打开关闭的状态              | Boolean         | -                | false  |
| hasBorder  | 是否有头部下划线              | Boolean         | -                | true  |
| isAnimation | 是否开启动画              | Boolean         | -                | true  |
| icon        | 图标              | object         | -                | -  |

## 事件
| 事件名称         | 说明                                    | 返回参数 |
|:-------------|:----------------------------------------|:-- |
| onClick  |	 点击头部触发事件 | 	(open,event) => void |
