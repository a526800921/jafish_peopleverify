/// <reference path="../index.d.ts" />

import Verify, { useId } from '../verify'
import { createBox, createShapes } from './template'
import './style.css'

const $ = (str: string): HTMLDivElement => document.querySelector(str)

const ShadowClass = 'jafish_peopleverify_shape'
const showShadowClass = 'jps-show'
const MainClass = 'jps-main'
const TitleClass = 'jpsm-title'
const ItemsClass = 'jpsm-items'
const ActiveClass = 'jpsmi-active'
const CloseClass = 'jpsmpl-img[alt=close]'
const ResetClass = 'jpsmpl-img[alt=reset]'
const SubmitClass = 'jpsmp-right'
const MsgClass = 'jpsmp-msg'
const MsgShowClass = 'jpsmpm-show'

const AttrKey = 'data-type'

/**
 * @description 图形验证 
 * */
export default class Shape extends Verify {
    readonly id: Jafish_Peopleverify.UseId
    // 节点所在dom
    private div: HTMLDivElement
    // 阴影
    private shadow: HTMLDivElement
    private shadowClick = (e: MouseEvent): any => {
        e.stopPropagation()
        // 点击遮罩则隐藏
        this.hide()
    }
    // 展示区
    private main: HTMLDivElement
    private mainClick = (e: MouseEvent): any => e.stopPropagation()
    // 标题区
    private title: HTMLDivElement
    // 图形区
    private items: HTMLDivElement
    private itemsClick = (e: MouseEvent): any => {
        const div = <HTMLDivElement>e.target
        const attr = div.getAttribute(AttrKey)

        if (!attr) return

        // 移除上一个
        this.select.dom && this.select.dom.classList.remove(ActiveClass)
        // 添加当前选中
        div.classList.add(ActiveClass)
        // 绑定选中
        this.select.dom = div
        this.select.key = +attr
    }
    // 选中
    private select: Jafish_Peopleverify.ShapeSelect = {
        dom: null,
        key: null,
    }
    // 关闭按钮
    private closeIcon: HTMLDivElement
    private closeIconClick = (e: MouseEvent): any => this.hide()
    // 重置按钮
    private resetIcon: HTMLDivElement
    private resetIconClick = (e: MouseEvent): any => this.reset()
    // 确认按钮
    private submit: HTMLDivElement
    private submitClick = (e: MouseEvent): any => {
        let failFlag: boolean = false
        let resetFlag: boolean = false

        if (!this.select.key) (failFlag = true) && this.showMsg('请选择指定的图形')
        else if (this.select.key !== this.answer) (failFlag = resetFlag = true) && this.showMsg('请选择正确的图形')

        if (failFlag) {
            // 失败回调
            this.result.fail && this.result.fail()
            // 失败刷新
            resetFlag && this.reset()
            return
        }

        // 验证通过
        this.pending = 1
        // 隐藏
        this.hide()
        // 执行通过回调
        this.result.success && this.result.success()
    }
    // 提示信息
    private message: HTMLDivElement
    private msgTimer: number
    private showMsg(msg: string): void {
        clearTimeout(this.msgTimer)

        // 展示
        this.message.innerText = msg
        this.message.classList.add(MsgShowClass)

        // 隐藏
        this.msgTimer = setTimeout(() => this.message.classList.remove(MsgShowClass), 3000)
    }

    // 回调
    private result: Jafish_Peopleverify.StartParams
    // 当前状态，与result同周期 1 -> 成功， 2 -> 失败， 3 -> 等待结果
    private pending: number
    // 答案
    private answer: number

    constructor() {
        super()

        // 当前实例id
        this.id = useId()
        // 初始化dom节点
        this.init()
    }

    // 初始化节点及事件
    init(): void {
        // 将节点注入body
        this.div = document.createElement('div')
        this.div.id = `jafish-shape-${this.id}`
        this.div.innerHTML = createBox()
        this.div.style.display = 'none'

        document.body.appendChild(this.div)

        const getClass = (c: string): string => `#${this.div.id} .${c}`

        // 获取遮罩层
        this.shadow = $(getClass(ShadowClass))
        this.shadow.addEventListener('click', this.shadowClick)

        // 获取展示区
        this.main = $(getClass(MainClass))
        this.main.addEventListener('click', this.mainClick)

        // 获取标题区
        this.title = $(getClass(TitleClass))

        // 获取图片列表区
        this.items = $(getClass(ItemsClass))
        this.items.addEventListener('click', this.itemsClick)

        // 关闭按钮
        this.closeIcon = $(getClass(CloseClass))
        this.closeIcon.addEventListener('click', this.closeIconClick)

        // 重置按钮
        this.resetIcon = $(getClass(ResetClass))
        this.resetIcon.addEventListener('click', this.resetIconClick)

        // 确认按钮
        this.submit = $(getClass(SubmitClass))
        this.submit.addEventListener('click', this.submitClick)

        // 提示信息
        this.message = $(getClass(MsgClass))
    }

    // 展示
    public start(params: Jafish_Peopleverify.StartParams): void {
        // 保存回调
        this.result = params
        this.pending = 3

        this.div.style.display = 'block'
        setTimeout(() => this.shadow.classList.add(showShadowClass), 4)

        // 刷新数据
        this.reset()
    }
    // 隐藏
    private hideTimer: number
    public hide(): void {
        clearTimeout(this.hideTimer)

        this.shadow.classList.remove(showShadowClass)
        this.hideTimer = setTimeout(() => {
            this.div.style.display = 'none'

            // 未验证成功，执行取消回调
            if (this.pending !== 1) {
                this.pending = null
                this.result.cancel && this.result.cancel()
            }
            // 移除回调
            this.result = null
            this.pending = null
            this.answer = null
        }, 300)
    }
    public reset(): void {
        const { key, title, items } = createShapes(9)

        this.answer = key
        this.title.innerHTML = title
        this.items.innerHTML = items

        this.select = {
            dom: null,
            key: null,
        }
    }
    // 销毁
    private destroyed: boolean = false
    public destroy(): void {
        // 在展示中销毁
        if (this.pending) {
            this.hide()
            setTimeout(() => this.destroy(), 350)
            return
        }

        if (this.destroyed) return
        this.destroyed = true

        // 移除timer
        clearTimeout(this.msgTimer)
        clearTimeout(this.hideTimer)

        // 移除事件
        this.shadow.removeEventListener('click', this.shadowClick)
        this.main.removeEventListener('click', this.mainClick)
        this.items.removeEventListener('click', this.itemsClick)
        this.closeIcon.removeEventListener('click', this.closeIconClick)
        this.resetIcon.removeEventListener('click', this.resetIconClick)
        this.submit.removeEventListener('click', this.submitClick)

        // 移除节点
        document.body.removeChild(this.div)

        // 移除引用
        this.div = null
        this.shadow = null
        this.main = null
        this.title = null
        this.items = null
        this.select = {
            dom: null,
            key: null,
        }
        this.closeIcon = null
        this.resetIcon = null
        this.submit = null
        this.message = null
    }
}


