import react from 'react'
import Style from './Star.module.scss'

function Star(props){
  const { value } = props
  return (
    <div className={Style.star}>
      {
        <span className="iconfont"></span>
      }
    </div>
  )
}

export default Star
