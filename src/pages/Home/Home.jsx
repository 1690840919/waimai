import React from 'react'
import { connect } from 'react-redux'
import Style from './Home.module.scss'
import AppBar from '../../components/AppBar/AppBar'
import TabBar from '../../components/TabBar/TabBar'
import Search from '../../components/Search/Search'
import AppSwiper from '../../components/AppSwiper/AppSwiper'
import HomeMenu from './components/HomeMenu/HomeMenu'
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu'
import HomeShop from './components/HomeShop/HomeShop'
function Home(props) {
  const { history } = props
  return (
    <div className={Style.home}>
      {/* 顶部标题栏目 */}
      <AppBar leftIcon={'&#xe61f;'} rightIcon={'&#xe7ce;'}
        bgColor={'rgb(91,170,250)'} color={'white'}
        left={'广州-天河'} leftSize={'14px'}
      />
      {/* 搜索框 */}
      <Search onClick={() => { history.push("/search") }} />
      {/* 轮播图 */}
      <AppSwiper width={'100%'} height={'100px'} />
      {/* 菜单 */}
      <HomeMenu />
      {/* 下拉菜单选择 */}
      <DropDownMenu />
      {/* 主页店铺 */}
      <HomeShop history={history} />
      {/* 底部导航栏 */}
      <TabBar history={history} current={0} />
    </div>
  )
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(Home)

