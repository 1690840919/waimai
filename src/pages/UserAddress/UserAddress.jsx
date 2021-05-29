import React, { useEffect, useState } from 'react'
import Style from './UserAddress.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import { userAddress } from '../../api/user'
import Loading from '../../components/Loading/Loading'

function UserAddress(props) {
  const { history } = props
  const [addressData, setAddressData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initUserAddress()
  }, [])

  // 初始化我的地址
  const initUserAddress = async () => {
    const { data } = await userAddress()
    setLoading(false)
    if (data.code === 1000) {
      setAddressData(data.data)
    }
  }

  // 编辑地址
  const handleEditAddress = async (data) => {
    history.push({
      pathname: '/userAddressEdit',
      query: data,
    })
  }

  return (
    <div className={Style.userAddress}>
      {/* 顶部标题 */}
      <AppBar fixed={true} handleLeft={() => { history.goBack() }}
        center={'我的地址'} bgColor={'rgb(91,170,250)'} />
      {/* 我的地址 */}
      <div className={Style.myAddress}>
        {
          addressData.map(obj => (
            <div key={obj.id} className={Style.address}>
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
        <Loading loading={loading} />
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
