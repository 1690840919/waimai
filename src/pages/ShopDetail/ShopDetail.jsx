import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import Style from './ShopDetail.module.scss'
import Shop from '../../components/Shop/Shop'
import AppTab from '../../components/AppTab/AppTab'
import ShopFood from './components/ShopFood/ShopFood'
import ShopInfo from './components/ShopInfo/ShopInfo'
import ShopComment from './components/ShopComment/ShopComment'
import { shopList } from '../../api/shop'
function ShopDetail(props) {
  const { history, match } = props
  const [current, setCurrent] = useState(0)
  const appTabData = ['点餐', '评价', '商家']
  const [shopInfo, setShopInfo] = useState()

  useEffect(() => {
    initShopInfo()
  }, [])

  // 初始化数据
  const initShopInfo = async () => {
    const { data } = await shopList({ id: match.params.id.replace(':', '') })
    if (data.code === 1000) {
      setShopInfo(data.data[0])
    }
  }
  const changeTab = (index) => {
    setCurrent(index)
  }
  return (
    <div className={Style.shopDetail}>
      {/* 顶部导航栏 */}
      <AppBar bgColor={'rgb(91,170,250)'} leftIcon={'&#xe651;'} color={'white'}
        rightIcon={'&#xe628;'} handleLeft={() => { history.goBack() }}
      />
      {/* 店铺信息 */}
      {
        shopInfo ?
          <Shop isTopInfo={true} data={shopInfo} bgColor={'rgb(91,170,250)'} color={'white'} />
          : null
      }
      {/* 菜单栏目 */}
      <AppTab appTabData={appTabData} changeTab={changeTab} current={current} />
      {
        current === 0 && shopInfo ?
          <ShopFood shopInfo={shopInfo} />
          : null
      }
      {
        current === 1 ?
          <ShopComment />
          : null
      }
      {
        current === 2 ?
          <ShopInfo />
          : null
      }
    </div>
  )
}

export default ShopDetail
