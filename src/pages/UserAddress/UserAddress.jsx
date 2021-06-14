import React, { useEffect, useState } from 'react'
import Style from './UserAddress.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import { userAddress } from '../../api/user'
import Loading from '../../components/Loading/Loading'
import DataNull from '../../components/DataNull/DataNull'

function UserAddress(props) {
  const { history } = props
  const [addressData, setAddressData] = useState([])
  const [loading, setLoading] = useState(true)
  const [addressDataNull, setAddressDataNull] = useState(false)

  useEffect(() => {
    initUserAddress()
  }, [])

  // 初始化我的地址
  const initUserAddress = async () => {
    const { data } = await userAddress()
    setLoading(false)
    if (data.code === 1000) {
      setAddressData(data.data)
      if (data.data && !data.data.length) {
        setAddressDataNull(true)
      }
      return
    }
    setAddressDataNull(true)
  }

  // 编辑地址
  const handleEditAddress = async (data) => {
    history.push({
      pathname: '/userAddressEdit',
      query: data,
    })
  }

  // 点击返回
  const handleBack = async () => {
    if (history.location.params && history.location.params.orderSure) {
      history.goBack()
    } else {
      history.push('/user')
    }
  }

  // 点击地址
  const handleAddress = async (address) => {
    if (history.location.params && history.location.params.orderSure) {
      history.replace({
        pathname: `/OrderSure:${history.location.params.id}`,
        params: {
          address,
        }
      })
    }
  }

  return (
    <div className={Style.userAddress}>
      {/* 顶部标题 */}
      <AppBar fixed={true} handleLeft={handleBack}
        center={'我的地址'} bgColor={'rgb(91,170,250)'} />
      {/* 我的地址 */}
      <div className={Style.myAddress}>
        {
          addressData.map(obj => (
            <div onClick={() => { handleAddress(obj) }} key={obj.id} className={Style.address}>
              <div
                dangerouslySetInnerHTML={{ __html: obj.isDefault ? '&#xe678;' : '&#xe6c1;' }}
                className={`${Style.aside} iconfont`}>

              </div>
              <div className={Style.center}>
                <p className={Style.title}>
                  <span>{obj.name}</span>
                  <span>{obj.phone}</span>
                </p>
                <p>
                  {obj.address + obj.detail}
                </p>
              </div>
              <div onClick={() => { handleEditAddress(obj) }} className={`${Style.aside} iconfont`}>
                &#xeb5c;
              </div>
            </div>
          ))
        }
        <Loading loading={loading} tip={!addressData} />
        {
          addressDataNull ?
            <DataNull />
            : null
        }
      </div>
      {/* 底部按钮 */}
      <div className={Style.addBtn}>
        <div onClick={() => { history.push("/userAddressEdit") }}
          className={Style.btn}>新增地址</div>
      </div>
    </div>
  )
}

export default UserAddress
