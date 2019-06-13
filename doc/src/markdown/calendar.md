# Calendar 日历

---
日历组件

## 使用指南

在 Taro 文件中引入组件

```js
import { PiAccordion } from 'pizza-ui'
```

**组件依赖的样式文件（仅按需引用时需要）**


## 用法

```html
<PiCalendar
  onSelectDate={this.onSelectDate}
  selectedDates={scheduleList}
/>
```

## Area 参数

| 参数         | 说明                                    | 类型            | 可选值           | 默认值 |
|:-------------|:----------------------------------------|:----------------|:-----------------|:-------|
| selectedDates  | 默认选中的时间                  | Array       | -                | -  |


## 事件
| 事件名称         | 说明                                    | 返回参数 |
|:-------------|:----------------------------------------|:-- |
| onSelectDate  |	 切换时间触发 |  function | - |
