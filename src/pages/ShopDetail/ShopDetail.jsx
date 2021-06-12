import React, { useEffect, useState } from 'react'
import AppBar from '../../components/AppBar/AppBar'
import Style from './ShopDetail.module.scss'
import Shop from '../../components/Shop/Shop'
import AppTab from '../../components/AppTab/AppTab'
import ShopFood from './components/ShopFood/ShopFood'
import ShopInfo from './components/ShopInfo/ShopInfo'
import ShopComment from './components/ShopComment/ShopComment'
import { shopList } from '../../api/shop'
import { userEdit } from '../../api/user'
import { connect } from 'react-redux'
import { updateUserInfo } from '../../redux/actions'
function ShopDetail(props) {
  const { history, match, userInfo, updateReduxUserInfo } = props
  const [current, setCurrent] = useState(0)
  const appTabData = ['点餐', '评价', '商家']
  const [shopInfo, setShopInfo] = useState()
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [isCollect, setIsCollect] = useState(false)


  useEffect(() => {
    initShopInfo()
  }, [])

  useEffect(() => {
    const { collectShopId } = userInfo
    if (!collectShopId) {
      setIsCollect(false)
    } else {
      const arr = collectShopId.split(',')
      const id = match.params.id.replace(':', '')
      if (arr.includes(id)) {
        setIsCollect(true)
      }
    }
  }, [userInfo])

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

  // 点击更多菜单
  const handleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu)
  }

  // 点击收藏店铺
  const handleCollect = async () => {
    const { data } = await userEdit({ addCollect: shopInfo.id })
    if (data.code !== 1000) {
      return
    }
    setIsCollect(!isCollect)
    const id = match.params.id.replace(':', '')
    const str = userInfo && userInfo.collectShopId + ''
    const newData = { ...userInfo }
    if (str) {
      const arr = str.split(',')
      if (arr.includes(id)) {
        arr.splice(arr.indexOf(id), 1)
      } else {
        arr.push(id)
      }
      newData.collectShopId = arr.join(',')
    } else {
      newData.collectShopId = id
    }
    console.log(newData.collectShopId)
    updateReduxUserInfo({ data: newData })
  }

  return (
    <div className={Style.shopDetail}>
      {/* 更多菜单 */}
      {
        showMoreMenu ?
          <div onClick={handleMoreMenu} className={Style.appBarMoreMenuBox}>
            <div onClick={e => { e.stopPropagation(); handleCollect() }}
              className={Style.appBarMoreMenu}>
              <div className={Style.menu}>
                <span
                  style={{
                    fontSize: '20px',
                    color: isCollect ? 'red' : 'rgb(202,202,202)'
                  }}
                  className="iconfont">&#xe642;</span>
                <span>收藏</span>
              </div>
            </div>
          </div>
          : null
      }
      {/* 顶部导航栏 */}
      <AppBar bgColor={'rgb(91,170,250)'} leftIcon={'&#xe651;'} color={'white'}
        handleRight={handleMoreMenu}
        rightIcon={'&#xe628;'} handleLeft={() => { history.goBack() }}
      />
      {/* 店铺信息 */}
      {
        shopInfo ?
          <Shop isTopInfo={true} data={shopInfo} bgColor={'rgb(91,170,250)'} color={'white'} />
          : null
      }
      {/* 菜单栏目 */}
      <AppTab sticky={true} top={0} appTabData={appTabData} changeTab={changeTab} current={current} />
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

export default connect(
  ({ userInfo }) => ({
    userInfo
  }),
  (dispatch) => ({
    updateReduxUserInfo: value => dispatch(updateUserInfo(value))
  })
)(ShopDetail)
