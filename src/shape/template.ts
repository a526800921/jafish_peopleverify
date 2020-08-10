/// <reference path="../index.d.ts" />

import close_png from '../images/close.png'
import reset_png from '../images/reset.png'


// 图形类型
const getShapes = (): Jafish_Peopleverify.ShapeItem[] => [
    { type: 1, name: '三角形' },
    { type: 2, name: '正方形' },
    { type: 3, name: '长方形' },
    { type: 4, name: '圆形' },
    { type: 5, name: '圆环' },
    { type: 6, name: '椭圆形' },
    { type: 7, name: '五角形' },
    { type: 8, name: '半圆形' },
    { type: 9, name: '向右箭头' },
    { type: 10, name: '向左箭头' },
    { type: 11, name: '向上箭头' },
    { type: 12, name: '向下箭头' },
    { type: 13, name: '六角星' },
    { type: 14, name: '月亮' },
]
// 获取范围内随机数
const getRandom = (num: number): number => Math.floor(Math.random() * num)

// 创建框架模板
export const createBox = (): string => {

    return `
        <div class="jafish_peopleverify jafish_peopleverify_shape">
            <div class="jps-main">
                <div class="jpsm-title"></div>
        
                <div class="jpsm-items"></div>
        
                <div class="jpsm-panel">
                    <div class="jpsmp-msg"></div>

                    <div class="jpsmp-box">
                        <div class="jpsmp-left">
                            <img class="jpsmpl-img" src="${close_png}" alt="close" />
                            <img class="jpsmpl-img" src="${reset_png}" alt="reset" />
                        </div>
            
                        <div class="jpsmp-right">确认</div>
                    </div>
                </div>
            </div>
        </div>
    `
}

// 获取随机内容
export const createShapes = (needNum: number = 9) => {
    const allShape = getShapes()
    // 所需随机模板
    const shapes: Jafish_Peopleverify.ShapeItem[] = []

    for (let i = 0; i < needNum; i++) {
        const index = getRandom(allShape.length)
        const item = allShape.splice(index, 1)[0]

        shapes.push(item)
    }

    const index = getRandom(shapes.length)

    return {
        key: shapes[index].type,
        title: `请在下方图形中选择：<span>${shapes[index].name}</span>`,
        items: shapes.reduce((dom, item) =>
            dom += `
                <div class="jpsmi-item" data-type="${item.type}">
                    <div class="jpsmii-${item.type}"></div>
                </div>
            `, '')
    }
}

