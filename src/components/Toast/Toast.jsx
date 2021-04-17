import React, { useEffect, useState } from 'react'
import Style from './Toast.module.scss'

function Toast(props) {
  const { text = '提示语句', isShow, icon = '&#xea76;' } = props
  const [show, setShow] = useState()

  const startToast = () => {
    // console.log('开启')
    setShow(true)
    setTimeout(() => {
      setShow(false)
      // console.log('关闭')
    }, 1000);
  }

  useEffect(() => {
    // console.log('检测')
    if (isShow) {
      startToast()
    }
  }, [isShow])

  return (
    <div>
      {
        show ?
          <div className={Style.toast}>
            <div className={Style.content}>
              <div>
                <div className={`iconfont ${Style.icon}`}
                  dangerouslySetInnerHTML={{ __html: icon }}></div>
                <div className={Style.tip}>{text}</div>
              </div>
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default Toast
