import React, { useEffect, useState } from 'react'
import Style from './Search.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import SearchBar from '../../components/Search/Search'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import Toast from '../../components/Toast/Toast'
import { shopSearch } from '../../api/shop'
import DataNull from '../../components/DataNull/DataNull'
import Shop from '../../components/Shop/Shop'
import { getItem, removeItem, setItem } from '../../utils/storage'
import { SEARCHHISTORY } from '../../utils/enums'
function Search(props) {
  const { history } = props
  const [searchValue, setSearchValue] = useState('')
  const [toastInfo, setToastInfo] = useState({})
  const [toastLoading, setToastLoading] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [searchResultNull, setSearchResultNull] = useState(false)
  const recommendData = [
    '猪脚饭', '麻辣烫', '鸡', '麦当劳', '真功夫', '尊宝', '汉堡', '鸡排', '1点点'
  ]
  const [searchHistory, setSearchHistory] = useState([])

  // 初始化搜索记录
  useEffect(()=>{
    const data = getItem(SEARCHHISTORY)
    if(data){
      setSearchHistory(data)
    }
  },[])

  // 增加历史记录
  const addSearchHistory = (value) => {
    if (!searchHistory.includes(searchValue) && value) {
      const newData = [...searchHistory, value]
      setSearchHistory(newData)
      setItem(SEARCHHISTORY,newData)
    }
  }

  // 点击搜索
  const handleSearch = async (value) => {
    if (!searchValue && !value) {
      setToastInfo({
        text: '搜索内容不能为空',
        date: new Date(),
      })
      return
    }
    getSearchData(value || searchValue)
  }

  // 请求数据
  const getSearchData = async searchValue => {
    addSearchHistory(searchValue)
    searchResultNull && setSearchResultNull(false)
    setToastLoading(true)
    const { data } = await shopSearch({ searchValue })
    setToastLoading(false)
    if (data.code === 1000) {
      if (data.data.length) {
        setSearchResult(data.data)
      } else {
        setSearchResult([])
        setSearchResultNull(true)
      }
      return
    }
    setSearchResultNull(true)
  }

  // 输入框变化
  const handleSearchValue = value => {
    setSearchValue(value)
    searchResult && setSearchResult(null)
  }

  // 点击关键词
  const handleSearchItem = value => {
    setSearchValue(value)
    handleSearch(value)
  }

  // 清空搜索历史
  const clearHistory = () => {
    setSearchHistory([])
    removeItem(SEARCHHISTORY)
    setSearchResultNull(true)
  }

  return (
    <div className={Style.search}>
      {/* 消息加载 */}
      {
        toastLoading ?
          <ToastLoading text={'搜索中'} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn} text={toastInfo.text}
        isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 顶部标题 */}
      <AppBar handleLeft={() => { history.goBack() }}
        center={'搜索'} bgColor={'rgb(91,170,250)'} />
      {/* 搜索框 */}
      <SearchBar
        value={searchValue}
        handleInput={value => { handleSearchValue(value) }}
        right={"搜索"}
        rightClick={() => { handleSearch() }} />
      {/* 搜索结果或没搜索 */}
      {
        searchResult ?
          <div className={Style.searchResult}>
            {
              searchResult.map(item => {
                return <Shop bgColor={'white'} history={props.history} key={item.id} data={item} />
              })
            }
            {
              searchResultNull ?
                <DataNull />
                : null
            }

          </div>
          :
          <div className={Style.noResult}>
            {/* 历史记录 */}
            <AppBar leftIcon={null} left={'历史记录'} paddingLeft={0} leftSize={'14px'}
              rightIcon={'&#xe61d;'} color={'#333'} handleRight={clearHistory} />
            <div className={Style.items}>
              {
                searchHistory && searchHistory.map(item => (
                  <span key={item} onClick={() => { handleSearchItem(item) }} className={Style.item}>{item}</span>
                ))
              }
              {
                searchHistory && !searchHistory.length ?
                  <DataNull />
                  : null
              }
            </div>
            {/* 搜索推荐 */}
            <AppBar leftIcon={null} left={'搜索推荐'} paddingLeft={0} leftSize={'14px'}
              color={'#333'} />
            <div className={Style.items}>
              {
                recommendData.map(item => (
                  <span key={item} onClick={() => { handleSearchItem(item) }} className={Style.item}>{item}</span>
                ))
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Search
