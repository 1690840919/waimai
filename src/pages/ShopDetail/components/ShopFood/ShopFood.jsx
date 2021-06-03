import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Style from './ShopFood.module.scss'
import AppBar from '../../../../components/AppBar/AppBar'
import Food from './components/Food/Food'
import CartFood from './components/CartFood/CartFood'
import { connect } from 'react-redux'
import Toast from '../../.../../../../components/Toast/Toast'
import { updateCart } from '../../../../redux/actions'
import { shopMenu, shopFood } from '../../../../api/shop'


function ShopFood(props) {
  const { cartInfo, shopInfo, dispatch } = props

  const [currentMenu, setCurrentMenu] = useState(2)

  const [showCartContent, setShowCartContent] = useState(false)

  const [totalNum, setTotalNum] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0.00)

  const [cartContent, setCartContent] = useState([])

  const [toastInfo, setToastInfo] = useState({})

  const [menuData, setMenuData] = useState([
    { menus: '热销', id: '000' },
    { menus: '折扣', id: '001' },
  ])

  const [foodData, setFoodData] = useState([])

  const history = useHistory();

  const match = useRouteMatch()

  useEffect(() => {
    if (shopInfo) {
      initData()
    }
  }, [shopInfo])

  // 初始化数据
  const initData = async () => {
    const id = shopInfo && shopInfo.id
    const { data: menu } = await shopMenu({ id })
    if (menu.code === 1000) {
      setMenuData(menuData.concat(menu.data))
    }

    const { data: foods } = await shopFood({
      id,
      menu: menuData[currentMenu] && menuData[currentMenu].menus
    })
    if (foods.code === 1000) {
      setFoodData(foods.data)
    }
  }

  // 点击菜单
  const handleMenu = async (index) => {
    setCurrentMenu(index)
    const { data: foods } = await shopFood({
      id: shopInfo.id,
      menu: menuData[index].menus
    })
    if (foods.code === 1000) {
      setFoodData(foods.data)
    }
  }

  // 更新购物车里面的信息
  useEffect(() => {
    if (cartInfo[shopInfo.id] && cartInfo[shopInfo.id].food) {
      setCartContent(cartInfo[shopInfo.id].food)
      const food = cartInfo[shopInfo.id]?.food || []
      let num = 0
      let price = 0
      if (food.length) {
        if (food.length === 1) {
          num += food[0].num
          price += food[0].num * food[0].foodPrice
        } else {
          food.forEach(obj => {
            num += obj.num
            price += obj.num * obj.foodPrice
          })
        }
      }
      setTotalNum(num)
      setTotalPrice(price)
    } else {
      setCartContent([])
      setTotalNum(0)
      setTotalPrice(0)
    }
  }, [cartInfo, shopInfo])

  // 点击购物车
  const handleCart = () => {
    if (!cartContent.length) {
      setToastInfo({
        text: '购物车是空的',
        date: new Date()
      })
      return
    }
    setShowCartContent(!showCartContent)
  }

  // 清空购物车
  const clearCart = () => {
    const newCartInfo = {
      ...cartInfo,
    }
    delete newCartInfo[shopInfo.id]
    dispatch(updateCart(newCartInfo))
    setShowCartContent(false)
  }

  // 去结算
  const goPay = () => {
    if (!cartContent.length) {
      setToastInfo({
        text: '购物车不能为空',
        date: new Date()
      })
      return
    }
    history.push(`/OrderSure:${(match.params.id).replace(':', "")}`)
  }

  return (
    <div className={Style.shopFood}>
      {/* 侧边菜单 */}
      <div className={Style.aside}>
        <ul className={Style.items}>
          {
            menuData.map((item, index) => {
              return <li
                key={item.id}
                style={{ background: currentMenu === index ? 'white' : null }}
                onClick={() => { handleMenu(index) }}
                className={Style.item}>{item.menus}</li>
            })
          }
        </ul>
      </div>
      {/* 菜单对应内容 */}
      <div className={Style.content}>
        {
          foodData.map(obj => {
            return <Food key={obj.id} obj={obj} shopInfo={shopInfo} />
          })
        }
      </div>
      {/* 购物车 */}
      <div className={Style.cart}>
        {/* 头像 */}
        <div className={Style.img} onClick={handleCart}>
          <div className={`iconfont ${Style.icon}`}>&#xe607;
            {totalNum ? <div className={Style.total}>{totalNum}</div> : null}
          </div>
        </div>
        {/* 信息 */}
        <div className={Style.cartInfo}>
          <p className={Style.price}>￥{totalPrice.toFixed(2)}</p>
          <p className={Style.tip}>另外需要配送费￥5</p>
        </div>
        {/* 按钮 */}
        <div onClick={goPay} className={Style.buy}>
          去结算
        </div>
      </div>
      {/* 购物车内容 */}
      {
        showCartContent ?
          <div onClick={handleCart} className={Style.cartContentBox}>
            <div onClick={(e) => { e.stopPropagation() }} className={Style.cartContent}>
              <div className={Style.absolute}>
                {/* 顶部标题 */}
                <AppBar absolute={true} paddingLeft={0} size={'12px'}
                  handleRight={clearCart}
                  left={'我的购物车'} color={'#333'} leftIcon={null}
                  rightIcon={'&#xe61d;'} rightSize={'12px'} />
              </div>
              {/* 商品 */}
              {
                cartContent.map(item => {
                  return <CartFood closeCartContent={() => { setShowCartContent(false) }}
                    shopInfo={shopInfo} key={item.id} item={item} />
                })
              }
            </div>
          </div>
          : null
      }
      {/* 消息提醒 */}
      <Toast text={toastInfo.text} isShow={toastInfo.date} />
    </div>
  )
}

export default connect(
  ({ cartInfo }) => ({
    cartInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(ShopFood)
