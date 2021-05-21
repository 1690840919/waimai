import React from 'react'
import Style from './AppBar.module.scss'

// 参数
// bgColor={'rgb(50,150,250)'}
// left={'左'}
// leftIcon={'&#xe627;'}
// center={'标题'}
// right={'右'}
// rightIcon={'&#xe695;'}
function AppBar(props) {
  // 接收背景颜色，左中右，图标
  const { leftSize, size, bgColor, left = null, center = null, right = null, leftIcon = '&#xe651;',
    handleRight, handleLeft, paddingLeft, paddingRight, onClick, height = '40px', rightSize,
    rightIcon = null, color, leftIconColor, rightIconColor, rightColor, fixed
  } = props
  return (
    <div onClick={onClick} className={Style.AppBar} style={{
      height, lineHeight: height,
      backgroundColor: bgColor, color, fontSize: size,
      position: fixed ? 'fixed' : null, top: 0, left: 0, right: 0, zIndex: 2,
    }}>
      {/* 左边 */}
      <div style={{ fontSize: leftSize, paddingLeft }} className={`${Style.left}`}>
        {/* 左边图标 */}
        <div
          onClick={handleLeft}
          style={{ color: leftIconColor }}
          className={`iconfont ${Style.leftIcon}`}
          dangerouslySetInnerHTML={{ __html: leftIcon }}
        >
        </div>
        {left}
      </div>
      {/* 中间 */}
      <div className={Style.center}>
        {center}
      </div>
      {/* 右边 */}
      <div style={{ fontSize: rightSize, paddingRight, color: rightColor }} className={Style.right}>
        {/* 右边图标 */}
        <div
          onClick={handleRight}
          style={{ color: rightIconColor }}
          className={`iconfont ${Style.rightIcon}`}
          dangerouslySetInnerHTML={{ __html: rightIcon }}
        >
        </div>
        {right}
      </div>
    </div >
  )
}


export default AppBar

