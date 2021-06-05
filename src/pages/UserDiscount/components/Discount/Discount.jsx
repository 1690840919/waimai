import react from 'react'
import Style from './Discount.module.scss'
import { getTime } from '../../../../utils/time'
import { useHistory } from 'react-router-dom'
function Discount(props) {
  const history = useHistory()
  const { obj } = props

  // 点击去使用红包
  const handlePacket = (discount,discountId) => {
    if (history.location.params && history.location.params.orderSure) {
      history.replace({
        pathname: `/orderSure:${history.location.params.id}`,
        params: {
          discount,
          discountId
        }
      })
    } else {
      history.push("/home")
    }
  }

  return (
    <div className={Style.discount}>
      <div className={Style.content}>
        {/* 信息 */}
        <div className={Style.info}>
          <div className={Style.avatar}>
            {
              obj.img ?
                <img src={obj.img} alt="" />
                :
                <span className="iconfont">&#xe62c;</span>
            }
          </div>
          <div className={Style.text}>
            <p className={Style.title}>{obj.title}</p>
            <p className={Style.time}>{getTime(obj.time, 'YY-MM-DD hh:mm:ss')}</p>
          </div>
          <div className={Style.priceInfo}>
            <p className={Style.price}>
              <span>￥</span>
              <span className={Style.num}>{obj.money}</span>
            </p>
            <p>{!obj.condition ? '无门槛' : `满${obj.condition}元可用`}</p>
          </div>
        </div>
        {/* 使用 */}
        <div className={Style.tip}>
          <div className={Style.left}>
            <span>{obj.method}</span>
          </div>
          <div className={Style.btn}
            onClick={() => { handlePacket(obj.money,obj.id) }}>使用</div>
        </div>
      </div>
    </div>
  )
}

export default Discount
