import React, { useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import Style from './ShopDetail.module.scss'
import Shop from '../../components/Shop/Shop'
import AppTab from '../../components/AppTab/AppTab'
import ShopFood from './components/ShopFood/ShopFood'
import ShopInfo from './components/ShopInfo/ShopInfo'
import ShopComment from './components/ShopComment/ShopComment'
function ShopDetail(props) {
  const { history,match } = props
  const [current, setCurrent] = useState(0)
  const appTabData = ['点餐', '评价', '商家']
  const shopInfo = {
    id: match.params.id.replace(':',''),
    img: 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c',
    name: '书亦烧仙草（龙洞广金店）',
    star: 3.7,
    price: "￥ 19/人",
    address: ['龙洞/岑村', "646m"],
    item: ' 奶茶/果汁 ',
  }
  const changeTab = (index) => {
    setCurrent(index)
  }
  return (
    <div className={Style.shopDetail}>
      {/* 顶部导航栏 */}
      <AppBar bgColor={'rgb(46, 47, 59)'} leftIcon={'&#xe651;'} color={'white'}
        rightIcon={'&#xe628;'} handleLeft={() => { history.goBack() }}
      />
      {/* 店铺信息 */}
      <Shop data={shopInfo} bgColor={'rgb(46, 47, 59)'} color={'white'} />
      {/* 菜单栏目 */}
      <AppTab appTabData={appTabData} changeTab={changeTab} current={current} />
      {
        current === 0 ?
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
