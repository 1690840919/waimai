import Style from './MoreBill.module.scss'
import react, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '../../../../components/AppBar/AppBar'
import Loading from '../../../../components/Loading/Loading'
import { getTime } from '../../../../utils/time'
import { userBill } from '../../../../api/user'
function MoreBill(props) {
  const history = useHistory()
  const [billData, setBillData] = useState([])
  const [billDataNull, setBillDataNull] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    initBillData()
  }, [])

  // 初始化账单数据
  const initBillData = async () => {
    const { data } = await userBill()
    if (data.code === 1000) {
      setLoading(false)
      if (!data.data.length) {
        setBillDataNull(true)
        return
      }
      setBillData(data.data)
    }else{
      setBillDataNull(true)
      setLoading(false)
    }
  }

  return (
    <div className={Style.moreBill}>
      {/* 顶部标题 */}
      <AppBar fixed={true} handleLeft={() => { history.goBack() }}
        center={'我的账单'} bgColor={'rgb(91,170,250)'} />
      
      {/* 我的账单 */}
      <div className={Style.content}>
        {
          billData.length ?
            <div>
              {
                billData.map(obj => (
                  <div key={obj.id} className={Style.bill}>
                    <div className={Style.avatar}>
                      <span className="iconfont"
                        dangerouslySetInnerHTML={{ __html: obj.isSpend ? '&#xe63c;' : '&#xe6d4;' }}
                      ></span>
                    </div>
                    <div className={Style.info}>
                      <p className={Style.title}>{obj.title}</p>
                      <p className={Style.time}>{getTime(obj.time, 'YY-MM-DD hh:mm:ss')}</p>
                    </div>
                    <div className={Style.right}>
                      <p>{obj.isSpend ? "-" + obj.num : "+" + obj.num}</p>
                      <p>余额：{obj.money}</p>
                    </div>
                  </div>
                ))
              }
            </div>
            : null
        }
        {
          billDataNull ?
            <div className={Style.billNull}>
              <span className="iconfont">&#xe603;</span>
              <p>没有数据</p>
            </div>
            : null
        }
      </div>
      {/* 加载中 */}
      <div className={Style.loadingBox}>
        <Loading loading={loading} tip={false} />
      </div>
    </div>
  )
}

export default MoreBill
