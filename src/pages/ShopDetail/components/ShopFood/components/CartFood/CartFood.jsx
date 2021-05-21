import React from 'react'
import { connect } from 'react-redux'
import Style from './CartFood.module.scss'
import { updateCart } from '../../../../../../redux/actions'
function CartFood(props) {
  const { changeCart, item, shopInfo, dispatch, cartInfo } = props

  // 点击添加/减少商品
  const handleNum = (foodData, add) => {
    if (cartInfo[shopInfo.id]) {
      const food = cartInfo[shopInfo.id].food
      // 查找有没有这个商品
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
    } else {
      foodData.num = 1
      const data = {
        shopInfo,
        food: [
          foodData
        ]
      }
      cartInfo[shopInfo.id] = data
    }
    dispatch(updateCart(cartInfo))
    // 购物车改变
    changeCart()
    console.log(cartInfo)
  }

  return (
    <div key={item.id} className={Style.food}>
      <div className={Style.img}>
        <img src={item.img} alt="" />
      </div>
      <div className={Style.info}>
        {item.name}
      </div>
      <div className={Style.price}>
        {item.price}
      </div>
      <div className={Style.btn}>
        <span onClick={() => { handleNum(item, 0) }}
          className={`iconfont ${Style.red}`}>&#xe611;</span>
        <span className={Style.foodNum}>{item.num}</span>
        <span onClick={() => { handleNum(item, 1) }}
          className={`iconfont ${Style.add}`}>&#xe640;</span>
      </div>
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
)(CartFood)
