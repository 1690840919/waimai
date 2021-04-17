import React, { useState } from 'react'
import Style from './ShopFood.module.scss'

function ShopFood(props) {
  const menuData = ['热销', '折扣', '招牌猪脚', '自选双拼', '豪华双拼', '招牌猪脚', '自选双拼', '豪华双拼']
  const foodData = [
    {
      id: '6001001',
      img: 'http://p0.meituan.net/wmproduct/976fc3446e6e14b9dfda46866c5f27a1141861.png',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    },
    {
      id: '6001002',
      img: 'http://p0.meituan.net/wmproduct/a15e62f0ea92cdbd36f5786678a6fc2640262.jpg',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    },
    {
      id: '6001003',
      img: 'http://p0.meituan.net/wmproduct/a15e62f0ea92cdbd36f5786678a6fc2640262.jpg',
      name: '新奥尔良烤翅买一送一',
      tip: '【美味鸡肉】当日新鲜发酵的饼底加上甄选风味浓郁的新奥尔良烤鸡肉，与美式香肠、鲜肉肠进行熔炼，辅以金黄香浓的马苏里拉芝士，每一口都是满足。英寸比萨不另外赠送优惠券！',
      sale: 300,
      good: 20,
      price: '12.9',
      discount: '4.19折 限购1份',
    }
  ]
  const [currentMenu, setCurrentMenu] = useState(2)
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
            return <div key={obj.id} className={Style.food}>
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
                <span className={`iconfont ${Style.red}`}>&#xe611;</span>
                <span className={Style.foodNum}>22</span>
                <span className={`iconfont ${Style.add}`}>&#xe640;</span>
              </div>
            </div>
          })
        }
      </div>
      {/* 购物车 */}
      <div className={Style.cart}>
        {/* 头像 */}
        <div className={Style.img}>
          <div className={`iconfont ${Style.icon}`}>&#xe607;</div>
        </div>
        {/* 信息 */}
        <div className={Style.cartInfo}>
          <p className={Style.price}>￥0.00</p>
          <p className={Style.tip}>另外需要配送费￥5</p>
        </div>
        {/* 按钮 */}
        <div className={Style.buy}>
          去结算
        </div>
      </div>
    </div>
  )
}

export default ShopFood
