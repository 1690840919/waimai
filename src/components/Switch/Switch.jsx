import react, { useEffect, useState } from 'react'
import Style from './Switch.module.scss'

function Switch(props) {
  const { value, change, height } = props
  const [select, setSelect] = useState()
  const [boxCss, setBoxCss] = useState()


  useEffect(() => {
    setSelect(value)
  }, [value])

  // 点击切换
  const handleChange = () => {
    change(!select)
    const data = {
      height: height,
      borderRadius: height,
    }
    if (select) {
      setSelect(false)
      data.width = height
      setBoxCss(data)
    } else {
      setSelect(true)
      data.width = '100%'
      setBoxCss(data)
    }
  }

  return (
    <div className={Style.switch}>
      <div onClick={handleChange} style={{ height: height }} className={Style.content}>
        <div style={boxCss || {
          height,
          width: select ? '100%' : height,
          transition: 'none',
          borderRadius: select ? height : '50%'
        }} className={Style.box}>
          <div style={{ height: height + 1, width: height + 1 }} className={Style.white}></div>
        </div>
      </div>
    </div >
  )
}
export default Switch
