import React from 'react'
import Style from './AppTab.module.scss'

function AppTab(props) {
  const { changeTab, current, appTabData, sticky, top } = props
  // const [current, setCurrent] = useState(0)

  const handleItem = (index) => {
    changeTab(index)
  }
  return (
    <div style={{ position: sticky ? 'sticky' : 'static', top }}
      className={Style.appTab}>
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
