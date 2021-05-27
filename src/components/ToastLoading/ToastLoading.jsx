import react from 'react'
import Style from './ToastLoading.module.scss'

function ToastLoading(props) {
  const { text = '加载中' } = props
  return (
    <div className={Style.toastLoading}>
      <div className={Style.toast}>
        <div className={Style.content}>
          <div>
            <div className={Style.icon}>
              <div className={Style.pswp__preloader__icn}>
                <div className={Style.pswp__preloader__cut}>
                  <div className={Style.pswp__preloader__donut}></div>
                </div>
              </div>
            </div>
            <div className={Style.tip}>{text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastLoading
