import React, { useEffect, useState } from 'react'
import Style from './HomeShop.module.scss'
import Shop from '../../../../components/Shop/Shop'
import { shopList } from '../../../../api/shop'
function HomeShop(props) {

  const [shopData, setShopData] = useState()

  useEffect(() => {
    initShopData()
  }, [])

  // 初始化店铺数据
  const initShopData = async () => {
    const { data } = await shopList({ num: 5 })
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
    </div>
  )
}

export default HomeShop
