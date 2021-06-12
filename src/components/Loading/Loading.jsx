import react, { useEffect, useState } from 'react'
import Style from './Loading.module.scss'

function Loading(props) {
  const [loading, setLoading] = useState(true)
  const { loading: newLoading, tip = true, padding } = props
  useEffect(() => {
    if (!newLoading) {
      setLoading(false)
    }
    if(newLoading){
      setLoading(true)
    }
  }, [newLoading])
  return (
    <div style={{ padding }} className={Style.loading}>
      {
        loading ?
          <div>
            <div className={Style.icon}>
              <div className={Style.pswp__preloader__icn}>
                <div className={Style.pswp__preloader__cut}>
                  <div className={Style.pswp__preloader__donut}></div>
                </div>
              </div>
            </div>
            <p>加载中</p>
          </div>
          :
          tip ?
            <div className={Style.noMore}>
              没有数据了
            </div>
            : null
      }
    </div>
  )
}

export default Loading
