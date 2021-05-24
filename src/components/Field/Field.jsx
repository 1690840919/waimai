import react, { useState } from 'react'
import Style from './Field.module.scss'

function Field(props) {
  const { title, tips, max } = props
  const [sizeLength,setSizeLength] = useState(0)
  return (
    <div className={Style.field}>
      <div className={Style.title}>{title || "标题"}</div>
      <div className={Style.input}>
        <span className={Style.sizeShow}>{sizeLength} / {max || 50}</span>
        <textarea onChange={e=>{setSizeLength(e.target.value.length)}} 
        placeholder={tips || "请输入内容"} type="text" maxLength={max || 50} />
      </div>
    </div>
  )
}

export default Field
