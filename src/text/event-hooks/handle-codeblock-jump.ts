/**
 * @description 处理代码快跳出
 * @author zhengwenjian
 */

import Editor from '../../editor/index'
import $ from '../../utils/dom-core'

/**
 * 处理最后一个节点为代码块的情况无法向下跳出代码块的问题
 * @param editor 编辑器实例
 * @param deleteUpEvents 删除键弹起事件集合
 * @param enterDownEvents 回车键按下事件集合
 */
function handleCodeBlockJump(
    editor: Editor,
    deleteUpEvents: Function[],
    enterDownEvents: Function[]
) {
    const $textElem = editor.$textElem

    function downFn() {
        const $lastElem = $textElem.children()?.last()
        if ($lastElem?.html().indexOf('<code>') !== -1) {
            // 如果是代码块的选区且编辑区域里最后一个元素不是空白p标签则生成一个空白p标签 目的为了让用户可以用上下箭头跳出代码快
            $textElem.append($('<p><br></p>'))
        }
    }

    deleteUpEvents.push(downFn)
    enterDownEvents.push(downFn)
}

export default handleCodeBlockJump
