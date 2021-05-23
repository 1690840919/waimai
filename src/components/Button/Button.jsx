import React from 'react'
import Style from './Button.module.scss'

function Button(props) {
  const { 
    onClick,
    display = 'block', text, width, height, bgColor, color, size, radius } = props
  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        color,
        backgroundColor: bgColor,
        lineHeight: height,
        fontSize: size,
        borderRadius: radius,
        display
      }}
      className={Style.button}>
      {text}
    </div>
  )
}

export default Button
