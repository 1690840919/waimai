import React, { useState } from 'react'
import Style from './AppTab.module.scss'

function AppTab(props) {
  const { changeTab, current, appTabData } = props
  // const [current, setCurrent] = useState(0)

  const handleItem = (index) => {
    changeTab(index)
  }
  return (
    <div className={Style.appTab}>
      {appTabData.map((item, index) => {
        return <div key={item} onClick={() => { handleItem(index) }}
          className={`${Style.item}`}>
          <span className={`${current === index ? Style.currentSpan : null}`}>{item}</span>
        </div>
      })}
    </div>
  )
}

export default AppTab
