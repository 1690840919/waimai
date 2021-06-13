import React, { useEffect, useState } from 'react'
import Style from './UserCollect.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Shop from '../../components/Shop/Shop'
import { shopCollect } from '../../api/shop'
import Loading from '../../components/Loading/Loading'
import DataNull from '../../components/DateNull/DataNull'
function UserCollect(props) {
  const { history } = props
  const [collectData, setCollectData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDataNull, setShowDataNull] = useState(false)


  useEffect(() => {
    initData()
  }, [])

  // 初始化数据
  const initData = async () => {
    const { data } = await shopCollect()
    if (data.code === 1000) {
      const arr = data.data
      setCollectData(arr)
      setLoading(false)
      if (!arr.length) {
        setShowDataNull(true)
      }
      return
    }
    setShowDataNull(true)
  }

  return (
    <div className={Style.userCollect}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'我的收藏'} bgColor={'rgb(91,170,250)'} />
      {/* 收藏店铺 */}
      {/* {
        !collectData.length ?
          <Loading tip={!showDataNull} loading={loading} /> :
          <div className={Style.collectShop}>
            {
              collectData.map(item => {
                return <Shop bgColor={'white'} history={props.history} key={item.id} data={item} />
              })
            }
            <Loading tip={!showDataNull} loading={loading} />
          </div>
      } */}
      <div className={Style.collectShop}>
        {
          collectData && collectData.map(item => {
            return <Shop bgColor={'white'} history={props.history} key={item.id} data={item} />
          })
        }
        <Loading tip={!showDataNull} loading={loading} />
      </div>
      {
        showDataNull ?
          <DataNull />
          : null
      }
    </div>
  )
}

export default UserCollect
