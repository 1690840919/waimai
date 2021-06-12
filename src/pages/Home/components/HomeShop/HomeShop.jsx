import React, { useEffect, useState } from 'react'
import Style from './HomeShop.module.scss'
import Shop from '../../../../components/Shop/Shop'
import { shopList } from '../../../../api/shop'
import Loading from '../../../../components/Loading/Loading'
function HomeShop(props) {

  const [shopData, setShopData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initShopData()
  }, [])

  // 初始化店铺数据
  const initShopData = async () => {
    const { data } = await shopList({ num: 5 })
    setLoading(false)
    if (data.code === 1000) {
      setShopData(data.data)
    }
  }

  return (
    <div className={Style.homeShop}>
      {
        shopData && shopData.map(item => {
          return <Shop history={props.history} key={item.id} data={item} />
        })
      }
      <Loading padding={'0px'} loading={loading} />
    </div>
  )
}

export default HomeShop
