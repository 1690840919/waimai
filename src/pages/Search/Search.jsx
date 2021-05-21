import React from 'react'
import Style from './Search.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import SearchBar from '../../components/Search/Search'

function Search(props) {
  const { history } = props

  const handleSearch = () => {
    console.log('搜索')
  }
  return (
    <div className={Style.search}>
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'搜索'} bgColor={'rgb(91,170,250)'} />
      {/* 搜索框 */}
      <SearchBar right={"搜索"} rightClick={handleSearch} />
      {/* 历史记录 */}
      <AppBar leftIcon={null} left={'历史记录'} paddingLeft={0} leftSize={'14px'}
        rightIcon={'&#xe61d;'} color={'#333'} />
      <div className={Style.items}>
        <span className={Style.item}>炸鸡韩博</span>
        <span className={Style.item}>炸鸡</span>
      </div>
      {/* 搜索推荐 */}
      <AppBar leftIcon={null} left={'搜索推荐'} paddingLeft={0} leftSize={'14px'}
        color={'#333'} />
      <div className={Style.items}>
        <span className={Style.item}>炸鸡韩博</span>
        <span className={Style.item}>炸鸡</span>
      </div>
    </div>
  )
}

export default Search
