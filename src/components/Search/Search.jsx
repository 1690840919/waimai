import React from 'react'
import Style from './Search.module.scss'

function Search(props) {
  const { height = '50px', left, right, onClick, rightClick, handleInput, value } = props
  return (
    <div onClick={onClick} style={{ height, lineHeight: height }} className={Style.search}>
      {
        left ?
          <div className={Style.left}>
            {left}
          </div>
          : null
      }

      <div className={Style.center}>
        <div className={`iconfont ${Style.searchIcon}`}>&#xe602;</div>
        <input
          value={value}
          placeholder="请输入搜索关键词"
          type="text" onChange={e => { handleInput(e.target.value) }} />
      </div>
      {
        right ?
          <div onClick={rightClick} className={Style.right}>
            {right}
          </div>
          : null
      }
    </div>
  )
}

export default Search
