import react, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import Style from './Dialog.module.scss'

function Dialog(props) {
  const { dialog, title = '提示', text = '确认吗？', confirm } = props
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (dialog) {
      setShow(!!dialog)
    }else{
      setShow(false)
    }
  }, [dialog])

  return (
    <Fragment>
      {
        show ?
          <div className={Style.dialog} >
            <div onClick={() => { setShow(false) }} className={Style.dialogBg}></div>
            <div className={Style.dialogBox}>
              <p className={Style.title}>{title}</p>
              <p className={Style.text}>{text}</p>
              <div className={Style.btn}>
                <div onClick={() => { setShow(false) }} className={Style.cancel}>取消</div>
                <div onClick={confirm} className={Style.confirm}>确认</div>
              </div>
            </div>
          </div >
          : null
      }
    </Fragment>
  )
}

export default Dialog
