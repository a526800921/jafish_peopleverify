
/// <reference path="./index.d.ts" />

/**
 * @description 行为验证父类 - 抽象类
 * */
export default abstract class Verify {
    // 初始化
    abstract init(params?: any): void

    // 启动验证
    public abstract start(params: Jafish_Peopleverify.StartParams): void
    
    // 隐藏
    public abstract hide(): void

    // 刷新
    public abstract reset(): void

    // 销毁
    public abstract destroy(): void
}

/**
 * @description 统一id，每次实例化 +1
  */
let id: Jafish_Peopleverify.UseId = 1
export const useId = (): Jafish_Peopleverify.UseId => id++
