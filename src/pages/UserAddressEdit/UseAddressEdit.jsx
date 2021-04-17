import React from 'react'
import Style from './UserAddressEdit.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
function UserAddressEdit(props) {
  const { history } = props
  return (
    <div className={Style.userAddressEdit}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'编辑地址'} bgColor={'rgb(91,170,250)'} />
      {/* 表单 */}
      <div className={Style.form}>
        {/* 姓名 */}
        <div className={Style.input}>
          <span className={Style.title}>姓名</span>
          <input type="text" placeholder='收货人姓名' />
        </div>
        {/* 电话 */}
        <div className={Style.input}>
          <span className={Style.title}>电话</span>
          <input type="text" placeholder='收货人手机号' />
        </div>
        {/* 地区 */}
        <div className={Style.input}>
          <span className={Style.title}>地区</span>
          <input type="text" placeholder='选择省 / 市 / 区' />
        </div>
        {/* 详细地址 */}
        <div className={Style.input}>
          <span className={Style.title}>详细地址</span>
          <input type="text" placeholder='街道门牌、楼层房间号等信息' />
        </div>
        {/* 默认地址 */}
        {/* <div className={Style.input}>
          <span className={Style.defaultAddress}>设为默认收货地址</span>
          <input type="text" placeholder='街道门牌、楼层房间号等信息' />
        </div> */}
      </div>
      {/* 保存按钮 */}
      <div className={Style.btn}>
        <Button bgColor={'rgb(109,180,251)'} text={'保存'}
          color={'white'} radius={'20px'} height={'40px'} width={'100%'} size={'14px'} />
      </div>
      {/* 删除按钮 */}
      <div className={Style.btn}>
        <Button bgColor={'rgb(214,228,243)'} text={'删除'}
          color={'#333'} radius={'20px'} height={'40px'} width={'100%'} size={'14x'} />
      </div>
    </div>
  )
}

export default UserAddressEdit
