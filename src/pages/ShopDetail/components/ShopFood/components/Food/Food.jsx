import React, { useEffect, useState } from 'react'
import Style from './Food.module.scss'
import { connect } from 'react-redux'
import { updateCart } from '../../../../../../redux/actions'
function Food(props) {
  const { obj, cartInfo, shopInfo, dispatch, changeCart } = props
  const [showNum, setShowNum] = useState(false)
  const [foodNum, setFoodNum] = useState(1)

  // 点击添加/减少商品
  const handleNum = (foodData, add) => {
    if (!showNum) {
      setShowNum(true)
    }
    if (cartInfo[shopInfo.id]) {
      const food = cartInfo[shopInfo.id].food
      // 查找有没有这个商品
      if (food.find(item => item.id === foodData.id)) {
        food.forEach((item, index) => {
          if (item.id === foodData.id) {
            if (food[index].num === 1 && !add) {
              setShowNum(false)
              food.splice(index, 1)
            } else {
              food[index].num += add ? 1 : -1
              setFoodNum(food[index].num)
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

  // 初始化数据
  useEffect(() => {
    const food = cartInfo[shopInfo.id]?.food || []
    const item = food.find(item => item.id === obj.id)
    if (item && item.num > 0) {
      setFoodNum(item.num)
      setShowNum(true)
    }
  }, [cartInfo, shopInfo, obj])

  return (
    <div key={obj.id} className={Style.food}>
      {/* 商品图片 */}
      <div className={Style.foodImg}>
        <img src={obj.img} alt="" />
      </div>
      {/* 商品信息 */}
      <div className={Style.foodInfo}>
        <p className={Style.title}>{obj.name}</p>
        <p className={Style.tip}>{obj.tip}</p>
        <p className={Style.num}>
          <span>月售{obj.sale}</span>
          <span>赞{obj.good}</span>
        </p>
        <p className={Style.price}>￥{obj.price}</p>
      </div>
      {/* 添加购物车按钮 */}
      <div className={Style.changeBtn}>
        {showNum ? <span className={`iconfont ${Style.red}`}
          onClick={() => { handleNum(obj, 0) }} >&#xe611;</span> : null}
        {showNum ? <span className={Style.foodNum}>{foodNum}</span> : null}
        <span onClick={() => { handleNum(obj, 1) }}
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
)(Food)
