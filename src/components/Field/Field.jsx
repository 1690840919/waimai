import react, { useEffect, useState } from 'react'
import Style from './Field.module.scss'

function Field(props) {
  const { title, tips, max, inputValue, value, length } = props
  const [sizeLength, setSizeLength] = useState(0)

  // 初始化数量
  useEffect(() => {
    setSizeLength(length)
  }, [length])

  // 输入框改变
  const textareaChange = (value) => {
    setSizeLength(value.length)
    inputValue(value)
  }

  return (
    <div className={Style.field}>
      <div className={Style.title}>{title || "标题"}</div>
      <div className={Style.input}>
        <span className={Style.sizeShow}>{sizeLength} / {max || 50}</span>
        <textarea onChange={e => { textareaChange(e.target.value) }} value={value}
          placeholder={tips || "请输入内容"} type="text" maxLength={max || 50} />
      </div>
    </div>
  )
}

export default Field
