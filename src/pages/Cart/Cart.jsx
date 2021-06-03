import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Style from './Cart.module.scss'
import TabBar from '../../components/TabBar/TabBar'
import AppBar from '../../components/AppBar/AppBar'
import Button from '../../components/Button/Button'
import cartNullImg from '../../assets/images/cartNull.jpg'
import { updateCart } from '../../redux/actions'

function Cart(props) {
  const { history, cartInfo,dispatch } = props
  const [totalCartPrice,setTotalCartPrice] = useState(0)

  useEffect(()=>{
    let price = 0
    for(let key in cartInfo){
      let num = 0
      cartInfo[key].food.forEach( obj => {
        if(obj.isSelect){
          num += obj.num * obj.foodPrice
        }
      })
      price += num
    }
    setTotalCartPrice(price)
  },[cartInfo])

  // 清空购物车内容
  const clearCartContent = () => {
    console.log('清空购物车')
  }

  // 点击添加/减少商品
  const handleNum = (foodData, add, shopInfo) => {
    let food
    if (cartInfo[shopInfo.id]) { // 购物车有这个店铺
      food = [...cartInfo[shopInfo.id].food] // 获取这个店铺的订单
      // 查找订单有没有这个商品
      if (food.find(item => item.id === foodData.id)) {
        food.forEach((item, index) => {
          if (item.id === foodData.id) {
            if (food[index].num === 1 && !add) {
              food.splice(index, 1)
            } else {
              food[index].num += add ? 1 : -1
            }
          }
        })
      } else {// 没有这个商品，设为1， 进行添加
        foodData.num = 1
        food.push(foodData)
      }
    } else { // 购物车没有这个店铺
      foodData.num = 1
      food = [foodData]
    }
    const data = {
      shopInfo,
      food
    }
    const newCartInfo = {
      ...cartInfo,
      [shopInfo.id]:data
    } 
    if(!food.length){
      delete newCartInfo[shopInfo.id]
    }
    dispatch(updateCart(newCartInfo))
  }

  // 检测商店是否全选
  const checkShopSelect = food => {
    const result = food.find(obj=>!obj.isSelect)
    return !!result
  }

  // 更新购物车商品选中状态
  const updateCartFoodSelect = (obj,shopInfo,food) => {
    obj.isSelect = !obj.isSelect
    food.forEach((item, index) => {
      if (item.id === obj.id) {
        food[index] = obj
      }
    })
    updateReduxCartInfo(shopInfo,food)
  }

  // 更新购物车店铺的选中状态
  const updateCartShopSelect = (food,shopInfo) => {
    const result = !checkShopSelect(food)
    if(result){// 现在是全选，改为全不选
      food.forEach((item, index) => {
        food[index].isSelect = false
      })
    }else{
      food.forEach((item, index) => {
        food[index].isSelect = true
      })
    }
    updateReduxCartInfo(shopInfo,food)
  }

  // 更新redux中cart数据
  const updateReduxCartInfo = (shopInfo,food) => {
    const data = {
      shopInfo,
      food
    }
    const newCartInfo = {
      ...cartInfo,
      [shopInfo.id]:data
    } 
    if(!food.length){
      delete newCartInfo[shopInfo.id]
    }
    dispatch(updateCart(newCartInfo))
  }

  // 检测是否购物车所有都选中
  const checkAllShopSelect = () => {
    for (let key in cartInfo){
      const result = cartInfo[key].food.find(obj=>!obj.isSelect)
      if(result){
        return false
      }
    }
    return true
  }

  // 点击购物车去结算的选中
  const handlePayCartSelect = () => {
    const result = checkAllShopSelect()
    const newCartInfo = {...cartInfo}
    if(result){
      for(let key in newCartInfo){
        newCartInfo[key].food.forEach((obj,index)=>{
          newCartInfo[key].food[index].isSelect = false
        })
      }
    }else{
      for(let key in newCartInfo){
        newCartInfo[key].food.forEach((obj,index)=>{
          newCartInfo[key].food[index].isSelect = true
        })
      }
    }
    dispatch(updateCart(newCartInfo))
  }

  return (
    <div className={Style.cart}>
      
      {/* 顶部标题栏目 */}
      <AppBar fixed={true} handleRight={clearCartContent}
        bgColor={'rgb(91,170,250)'} leftIcon={null} rightIcon={'&#xe61d;'}
        color={'white'} center={'我的购物车'} />
      {/* 购物车内容 */}
      <div className={Style.cartContent}>
        {
          Object.keys(cartInfo).length ?
            // 购物车有内容
            <div className={Style.cartData}>
              {/* 商品信息 */}
              <div className={Style.cartShopBox}>
                {
                  Object.keys(cartInfo).map(key => (
                    <div key={key} className={Style.foodInfo}>
                      {/* 店铺名称 */}
                      <div className={Style.shopName}>
                        <div className={Style.selectBtn}>
                          <span className="iconfont" 
                            onClick={()=>{updateCartShopSelect(cartInfo[key].food,cartInfo[key].shopInfo)}}
                            dangerouslySetInnerHTML={{__html:checkShopSelect(cartInfo[key].food)? '&#xe6c1;':'&#xe678;'}}></span>
                        </div>
                        <div className={Style.shopName} 
                        onClick={()=>{history.push(`/shopDetail:${key}`)}}>
                          <span>
                            {cartInfo[key].shopInfo.name}
                          </span>
                        </div>
                      </div>
                      {/* 店铺商品 */}
                      {
                        cartInfo[key].food.map(obj=>(
                          <div key={obj.id} className={Style.shopFood}>
                            <div className={Style.selectBtn}>
                            <span className="iconfont" 
                            onClick={()=>{updateCartFoodSelect(obj,cartInfo[key].shopInfo,cartInfo[key].food)}}
                              dangerouslySetInnerHTML={{__html:!obj.isSelect?'&#xe6c1;':'&#xe678;'}}></span>
                            </div>
                            <div className={Style.shopFoodImg}>
                              <img src={obj.foodImg} alt="" />
                            </div>
                            <div className={Style.shopFoodInfo}>
                              <p className={Style.name}>{obj.foodName}</p>
                              <div className={Style.tools}>
                                <div className={Style.price}>
                                  ￥{obj.foodPrice}
                                </div>
                                <div className={Style.btn}>
                                  {/* 添加购物车按钮 */}
                                  <div className={Style.changeBtn}>
                                    {obj.num ? <span className={`iconfont ${Style.red}`} // 减少商品
                                      onClick={() => { handleNum(obj,0,cartInfo[key].shopInfo) }} >&#xe611;</span> : null}
                                    {obj.num ? <span className={Style.foodNum}>{obj.num}</span> : null}
                                    <span onClick={() => { handleNum(obj,1,cartInfo[key].shopInfo) }} // 增加商品
                                      className={`iconfont ${Style.add}`}>&#xe640;</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            :
            // {/* 购物车是空的 */}
            <div className={Style.cartNull}>
              <div className={Style.cartNullContent}>
                <div className={Style.cartNullImg}>
                  <img src={cartNullImg} alt="" />
                </div>
                <p className={Style.title}>购物车还是空的</p>
                <Button onClick={() => { history.push('/home') }}
                  width={'120px'} height={'40px'} size={'14px'}
                  bgColor={'rgb(91,170,250)'} color={'white'}
                  text={'马上去购物'} />
              </div>
            </div>
        }
      </div>
      {/* 购物车去结算 */}
      {
        Object.keys(cartInfo).length ?
        <div className={Style.goPayBox}>
          <div className={Style.payCartInfo}>
            <div className={Style.allSelect}>
              <span className="iconfont" onClick={handlePayCartSelect}
                dangerouslySetInnerHTML={{__html:checkAllShopSelect()?'&#xe678;' :'&#xe6c1;'}}></span>
            </div>
            <div className={Style.allSelectTitle}>
              全选
            </div>
            <div className={Style.price}>
                合计：<span>￥{totalCartPrice.toFixed(2)}</span>
            </div> 
          </div>
          <div className={Style.payBtn}>
            去结算
        </div>
        </div>
        : null
      }
      {/* 底部导航栏 */}
      <TabBar history={history} current={2} />
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
)(Cart)

