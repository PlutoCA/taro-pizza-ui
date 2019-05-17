# Area 地址选择器

---

展示国内省市区三栏区域选择

## 使用指南

在 Taro 文件中引入组件

```js
import { PiArea } from 'pizza-ui'
```

**组件依赖的样式文件（仅按需引用时需要）**

```scss
@import "~pizza-ui/dist/style/components/area.scss";
```

## 用法

```html
<Area onAddressChange={this.onGetAddress}>
  <View className="button">选择省市</View>
</Area>
```

## Area 参数

| 参数         | 说明                                    | 类型            | 可选值           | 默认值 |
|:-------------|:----------------------------------------|:----------------|:-----------------|:-------|
| onAddressChange      | 获得用户选择的地址信息                  | Function         | -                | undefined  |
