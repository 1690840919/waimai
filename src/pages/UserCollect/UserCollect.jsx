import React, { useEffect, useState } from 'react'
import Style from './UserCollect.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Shop from '../../components/Shop/Shop'
import { shopCollect } from '../../api/shop'
function UserCollect(props) {
  const { history } = props
  const [collectData, setCollectData] = useState()


  useEffect(() => {
    initData()
  }, [])

  // 初始化数据
  const initData = async () => {
    const { data } = await shopCollect()
    if (data.code === 1000) {
      setCollectData(data.data)
    }
  }

  return (
    <div className={Style.userCollect}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的收藏'} bgColor={'rgb(91,170,250)'} />
      {/* 收藏店铺 */}
      {
        collectData && collectData.length ?
          <div className={Style.collectShop}>
            {
              collectData.map(item => {
                return <Shop bgColor={'white'} history={props.history} key={item.id} data={item} />
              })
            }
          </div>
          : null
      }
    </div>
  )
}

export default UserCollect
