import React, { useEffect, useState } from 'react'
import Style from './ShopFood.module.scss'
import AppBar from '../../../../components/AppBar/AppBar'
import Food from './components/Food/Food'
import CartFood from './components/CartFood/CartFood'
import { connect } from 'react-redux'
import Toast from '../../.../../../../components/Toast/Toast'
import { updateCart } from '../../../../redux/actions'


function ShopFood(props) {
  const { cartInfo, shopInfo, dispatch } = props
  const menuData = ['热销', '折扣', '招牌猪脚', '自选双拼', '豪华双拼', '招牌猪脚', '自选双拼', '豪华双拼']
  const foodData = [
    {
      id: '6001001',
      img: 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    },
    {
      id: '6001002',
      img: 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    },
    {
      id: '6001003',
      img: 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    }
  ]
  const [currentMenu, setCurrentMenu] = useState(2)

  const [showCartContent, setShowCartContent] = useState(false)

  const [totalNum, setTotalNum] = useState(0)

  const [cartContent, setCartContent] = useState([])

  const [toastInfo, setToastInfo] = useState({})

  // 更新购物车里面的信息
  useEffect(() => {
    if (cartInfo[shopInfo.id] && cartInfo[shopInfo.id].food) {
      setCartContent(cartInfo[shopInfo.id].food)
      const food = cartInfo[shopInfo.id]?.food || []
      let num
      if(food.length){
        num = food.length === 1? food[0].num:food.reduce((a, b) => (a.num + b.num))
      }else{
        num = 0
      }
      setTotalNum(num)
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
    const data = {
      shopInfo,
      food:[],
    }
    const newCartInfo = {
      ...cartInfo,
      [shopInfo.id]:data
    } 
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
  }

  return (
    <div className={Style.shopFood}>
      {/* 侧边菜单 */}
      <div className={Style.aside}>
        <ul className={Style.items}>
          {
            menuData.map((item, index) => {
              return <li
                key={index}
                style={{ background: currentMenu === index ? 'white' : null }}
                onClick={() => { setCurrentMenu(index) }}
                className={Style.item}>{item}</li>
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
          <p className={Style.price}>￥0.00</p>
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
                  return <CartFood closeCartContent={()=>{setShowCartContent(false)}}
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
