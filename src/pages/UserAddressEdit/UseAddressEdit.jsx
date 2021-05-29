import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Style from './UserAddressEdit.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import { userNewAddress, userDeleteAddress } from '../../api/user'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import Toast from '../../components/Toast/Toast'
function UserAddressEdit(props) {
  const { history } = props
  const routeLocation = useLocation()
  const [toastLoading, setToastLoading] = useState({ is: false })
  const [toastInfo, setToastInfo] = useState({})
  const [reqData, setReqData] = useState({
    name: '',
    phone: '',
    address: '',
    detail: '',
    default: false,
  })

  useEffect(() => {
    if (routeLocation.query) {
      const { name, phone, address, detail, id } = routeLocation.query
      setReqData({
        name, phone, address, detail, id
      })
    }
  }, [routeLocation])

  // 数据改变
  const changeReqData = (type, value) => {
    setReqData(pre => {
      const data = { ...pre }
      data[type] = value
      return data
    })
  }

  // 点击保存
  const handleSave = async () => {
    setToastLoading({ is: true, text: routeLocation.query ? '修改中' : '保存中' })
    const { data } = await userNewAddress(reqData)
    setToastLoading({ is: false })
    if (data.code !== 1000) {
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    setReqData({
      name: '',
      phone: '',
      address: '',
      detail: '',
      default: false,
    })
    setToastInfo({
      text: routeLocation.query ? '修改成功' : data.message,
      date: new Date(),
      callBackFn: () => {
        history.replace('/userAddress')
      }
    })
  }

  // 点击删除
  const handleDelete = async () => {
    setToastLoading({ is: true, text: '删除中' })
    const { data } = await userDeleteAddress({ id: routeLocation.query.id })
    setToastLoading({ is: false })
    setToastInfo({
      text: data.message,
      date: new Date(),
      callBackFn: () => {
        history.replace('/userAddress')
      }
    })
  }

  return (
    <div className={Style.userAddressEdit}>
      {/* 消息加载 */}
      {
        toastLoading.is ?
          <ToastLoading text={toastLoading.text} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'编辑地址'} bgColor={'rgb(91,170,250)'} />
      {/* 表单 */}
      <div className={Style.form}>
        {/* 姓名 */}
        <div className={Style.input}>
          <span className={Style.title}>姓名</span>
          <input onChange={e => { changeReqData('name', e.target.value) }} value={reqData.name} type="text" placeholder='收货人姓名' />
        </div>
        {/* 电话 */}
        <div className={Style.input}>
          <span className={Style.title}>电话</span>
          <input onChange={e => { changeReqData('phone', e.target.value) }} value={reqData.phone} type="text" placeholder='收货人手机号' />
        </div>
        {/* 地区 */}
        <div className={Style.input}>
          <span className={Style.title}>地区</span>
          <input onChange={e => { changeReqData('address', e.target.value) }} value={reqData.address} type="text" placeholder='选择省 / 市 / 区' />
        </div>
        {/* 详细地址 */}
        <div className={Style.input}>
          <span className={Style.title}>详细地址</span>
          <input onChange={e => { changeReqData('detail', e.target.value) }} value={reqData.detail} type="text" placeholder='街道门牌、楼层房间号等信息' />
        </div>
        {/* 默认地址 */}
        {/* <div className={Style.input}>
          <span className={Style.defaultAddress}>设为默认收货地址</span>
          <input type="text" placeholder='街道门牌、楼层房间号等信息' />
        </div> */}
      </div>
      {/* 保存按钮 */}
      <div className={Style.btn}>
        <Button onClick={handleSave} bgColor={'rgb(109,180,251)'} text={'保存'}
          color={'white'} radius={'20px'} height={'40px'} width={'100%'} size={'14px'} />
      </div>
      {/* 删除按钮 */}
      {
        routeLocation.query ?
          <div className={Style.btn}>
            <Button bgColor={'rgb(214,228,243)'} text={'删除'} onClick={handleDelete}
              color={'#333'} radius={'20px'} height={'40px'} width={'100%'} size={'14x'} />
          </div>
          : null
      }
    </div>
  )
}

export default UserAddressEdit
