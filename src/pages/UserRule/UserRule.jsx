import React from 'react'
import Style from './UserRule.module.scss'
import AppBar from '../../components/AppBar/AppBar'
function UserRule(props) {
  const ruleData = [
    {
      to: "/userInfo",
      left: '服务承诺',
    },
    {
      to: "/",
      left: '用户协议',
    },
    {
      to: "/",
      left: '平台秩序',
    },
    {
      to: "/",
      left: '配送规范',
    },
    {
      to: "/",
      left: '消费者保障',
    }
  ]
  const { history } = props
  return (
    <div className={Style.userRule}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'规则中心'} bgColor={'rgb(91,170,250)'} />
      {/* 设置选项 */}
      <div className={Style.settingItem}>
        {ruleData.map(item => {
          return <AppBar key={item.left} leftIcon={null} height={'50px'}
            // onClick={() => { history.push(item.to) }}
            left={item.left} bgColor={'white'} paddingLeft={0}
            color={'#333'} rightIcon={'&#xe695;'} />
        })}
      </div>
    </div>
  )
}

export default UserRule
