import react from 'react'
import Style from './DataNull.module.scss'

function DataNull(props) {
  return (
    <div className={Style.dataNull}>
      <div className={Style.billNull}>
        <span className="iconfont">&#xe603;</span>
        <p>没有数据</p>
      </div>
    </div>
  )
}
export default DataNull
