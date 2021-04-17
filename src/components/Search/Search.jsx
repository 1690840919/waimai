import React from 'react'
import Style from './Search.module.scss'

function Search(props) {
  const { height = '50px', left, right } = props
  return (
    <div style={{ height, lineHeight: height }} className={Style.search}>
      {
        left ?
          <div className={Style.left}>
            {left}
          </div>
          : null
      }

      <div className={Style.center}>
        <div className={`iconfont ${Style.searchIcon}`}>&#xe602;</div>
        <input placeholder="请输入搜索关键词" type="text" />
      </div>
      {
        right ?
          <div className={Style.right}>
            {right}
          </div>
          : null
      }
    </div>
  )
}

export default Search
