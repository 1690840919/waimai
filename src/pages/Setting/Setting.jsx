import React from 'react'
import AppBar from '../../components/AppBar/AppBar'
import Style from './Setting.module.scss'

function Setting(props) {
  const { history } = props
  const settingData = [
    {
      to: "/userInfo",
      left: '个人中心',
    },
    {
      to: "/",
      left: '安全设置',
    },
    {
      to: "/",
      left: '隐私设置',
    },
    {
      to: "/",
      left: '退出登陆',
    }
  ]
  return (
    <div className={Style.setting}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'设置'} bgColor={'rgb(91,170,250)'} />
      {/* 设置选项 */}
      <div className={Style.settingItem}>
        {settingData.map(item => {
          return <AppBar key={item.left} leftIcon={null} height={'50px'}
            onClick={() => { history.push(item.to) }}
            left={item.left} bgColor={'white'} paddingLeft={0}
            color={'#333'} rightIcon={'&#xe695;'} />
        })}
      </div>
    </div>
  )
}

export default Setting
