declare namespace Jafish_Peopleverify {
    type UseId = number

    /* Verify */
    interface StartParams {
        success: () => any
        fail?: () => any
        cancel?: () => any
    }

    /* Shape */
    interface ShapeItem {
        type: number
        name: string
    }
    interface ShapeSelect {
        dom: HTMLDivElement
        key: number
    }
}
