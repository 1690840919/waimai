import React from 'react'
import Style from './HomeMenu.module.scss'

function HomeMenu(props) {
  const menuData = [
    {
      name: '美食',
      icon: '&#xe609;',
      color: 'rgb(255,165,0)'
    },
    {
      name: '超市',
      icon: '&#xe61c;',
      color: 'rgb(124,135,231)'
    },
    {
      name: '水果',
      icon: '&#xe612;',
      color: 'rgb(96,223,107)'
    },
    {
      name: '火锅',
      icon: '&#xe621;',
      color: 'rgb(244,23,23)'
    },
    {
      name: '甜品',
      icon: '&#xe622;',
      color: 'rgb(250,74,162)'
    },
    {
      name: '炸鸡',
      icon: '&#xe634;',
      color: 'rgb(206,92,155)'
    },
    {
      name: '烧肉',
      icon: '&#xe60a;',
      color: 'rgb(255,124,112)'
    },
    {
      name: '小吃',
      icon: '&#xe600;',
      color: 'rgb(85,206,236)'
    },
  ]
  return (
    <div className={Style.homeMenu}>
      {
        menuData.map(item => {
          return <div key={item.name} className={Style.item}>
            <div style={{ backgroundColor: item.color }}
              className={`iconfont ${Style.img}`}
              dangerouslySetInnerHTML={{ __html: item.icon }}
            ></div>
            <div className={Style.name}>{item.name}</div>
          </div>
        })
      }

    </div >
  )
}

export default HomeMenu
