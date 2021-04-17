import React, { useState } from 'react'
import Style from './DropDownMenu.module.scss'

function DropDownMenu(props) {
  const [current, setCurrent] = useState('')
  const [currentName, setCurrentName] = useState({
    '全部商品': 0,
    '附近商店': 0,
    '智能排序': 0,
    '筛选': 0,
  })
  const menuData = {
    '全部商品': [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    '附近商店': [
      { text: '智能排序', value: 0 },
      { text: '好评排序', value: 1 }
    ],
    '智能排序': [
      { text: '智能排序', value: 0 },
      { text: '好评排序', value: 1 }
    ],
    '筛选': [
      { text: '筛选', value: 0 },
      { text: '价格最低', value: 1 }
    ],
  }
  // 点击一级菜单
  const handleItem = (key) => {
    if (current === key) {
      setCurrent("")
    } else {
      setCurrent(key)
    }
  }
  // 点击二级菜单
  const handleTwoItem = (index) => {
    setCurrentName(pre => {
      const value = pre
      value[current] = index
      return value
    })
    setCurrent('')
  }
  return (
    <div className={Style.dropDownMenu}>
      {
        Object.keys(menuData).map(key => {
          return <div onClick={() => { handleItem(key) }} key={key} className={Style.item}>
            {
              // 标题和图标
              <span className={Style.title} >{key}
                <div className={Style.moreIcon}>
                </div>
              </span>
            }
          </div>
        })
      }
      {
        // 二级菜单
        <ul className={Style.twoMenu}>
          {
            current !== "" ?
              menuData[current].map((item, index) => {
                return <li
                  key={item.text}
                  onClick={() => {
                    handleTwoItem(item.value)
                  }}
                  style={{
                    color: currentName[current] === index ? 'red' : null,
                  }} className={Style.name}>
                  {item.text}
                  {
                    // 勾号图标
                    currentName[current] === index ?
                      <div className={`iconfont ${Style.icon}`}>&#xe687;</div>
                      : null
                  }
                </li>
              })
              : null
          }
        </ul>
      }
    </div>
  )
}

export default DropDownMenu
