import React, { useEffect, useState } from 'react'
import Style from './Food.module.scss'
import { connect } from 'react-redux'
import { updateCart } from '../../../../../../redux/actions'
function Food(props) {
  const { obj, cartInfo, shopInfo, dispatch, changeCart } = props
  const [showNum, setShowNum] = useState(false)
  const [foodNum, setFoodNum] = useState(0)

  // 点击添加/减少商品
  const handleNum = (foodData, add) => {
    if (add && !showNum) {
      setShowNum(true)
    }
    let food
    if (cartInfo[shopInfo.id]) { // 购物车有这个店铺
      food = [...cartInfo[shopInfo.id].food] // 获取这个店铺的订单
      // 查找订单有没有这个商品
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
        foodData.isSelect = true
        food.push(foodData)
      }
    } else { // 购物车没有这个店铺
      foodData.num = 1
      foodData.isSelect = true
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

  // 初始化数据
  useEffect(() => {
    const food = cartInfo[shopInfo.id]?.food || []
    const item = food.find(item => item.id === obj.id)
    if (item && item.num) {
      setFoodNum(item.num)
      setShowNum(true)
    }else{
      setFoodNum(0)
      setShowNum(false)
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
        {showNum ? <span className={`iconfont ${Style.red}`} // 减少商品
          onClick={() => { handleNum(obj, 0) }} >&#xe611;</span> : null}
        {showNum ? <span className={Style.foodNum}>{foodNum}</span> : null}
        <span onClick={() => { handleNum(obj, 1) }} // 增加商品
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
