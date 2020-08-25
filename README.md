# @jafish/peopleverify

[![npm](https://img.shields.io/npm/v/@jafish/peopleverify)](https://www.npmjs.com/package/@jafish/peopleverify)

web端简易的用户行为验证


## shape 形状验证

### 使用

```js
import { Shape } from '@jafish/peopleverify'

// 初始化 - 追加所需dom节点
const shape = new Shape()

// 开始验证 - 展示
shape.start({
    success() { console.log('success') },
    fail() { console.log('fail') },
    cancel() { console.log('cancel') },
})

// 不使用之后销毁
shape.destroy()
```

### 实践

```js
import { Shape } from '@jafish/peopleverify';

export const shapeVerify = () => new Promise(resolve => {
    const shape = new Shape();

    shape.start({
        success() {
            resolve(true);
            shape.destroy();
        },
        cancel() {
            resolve(false);
            shape.destroy();
        },
    });
});
```

形状列表：

* 1 -> 三角形
* 2 -> 正方形
* 3 -> 长方形
* 4 -> 圆形
* 5 -> 圆环
* 6 -> 椭圆形
* 7 -> 五角形
* 8 -> 半圆形
* 9 -> 向右箭头
* 10 -> 向左箭头
* 11 -> 向上箭头
* 12 -> 向下箭头
* 13 -> 六角星
* 14 -> 月亮

### 更新

> 1.0.3 

* 更新了在选择错误的选项时，更新选项
