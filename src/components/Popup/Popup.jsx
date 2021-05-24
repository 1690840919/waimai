import React, { useEffect, useState, useImperativeHandle } from 'react'
import { connect } from 'react-redux'
import Style from './Popup.module.scss'


function Popup(props) {
  const { PopupRef, height, content } = props
  const [showContent, setShowContent] = useState(false)

  // 暴露的方法
  useImperativeHandle(PopupRef, () => {
    return {
      setShowContent: () => {
        setShowContent(true)
      }
    }
  })

  return (
    <div className={Style.popup}>
      {
        showContent ?
          <div className={Style.popupBox} onClick={() => { setShowContent(false) }}>
            <div
              style={{ height }}
              onClick={e => { e.stopPropagation() }}
              className={Style.bottomContentBox}>
              {content}
            </div>
          </div>
          : null
      }
    </div>
  )
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(Popup)


