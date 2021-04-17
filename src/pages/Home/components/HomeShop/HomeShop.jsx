import React from 'react'
import Style from './HomeShop.module.scss'
import Shop from '../../../../components/Shop/Shop'
function HomeShop(props) {
  const shopData = [
    {
      id: '001',
      img: 'https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c',
      name: '书亦烧仙草（龙洞广金店）',
      star: 3.7,
      price: "￥ 19/人",
      address: ['龙洞/岑村', "646m"],
      item: ' 奶茶/果汁 ',
      newShop: true,
      quan: '88代100元，92代100元 ',
      jian: '买单立享满100减12 ',
      tuan: '单人餐30元，双人餐132元，4人餐216元'
    },
    {
      id: '002',
      img: 'https://img.meituan.net/msmerchant/de445de110c0177c85d473b4a6e40c4e1130737.jpg@320w_320h_1e_1c',
      name: '书亦烧仙草（龙洞广金店）',
      star: 3.7,
      price: "￥ 19/人",
      address: ['龙洞/岑村', "646m"],
      item: ' 奶茶/果汁 ',
      newShop: false,
      quan: '88代100元，92代100元 ',
      jian: '买单立享满100减12 ',
      tuan: '单人餐30元，双人餐132元，4人餐216元'
    },
    {
      id: '003',
      img: 'https://img.meituan.net/msmerchant/99a000ce07db3a7b5dd9aca22806b39c129996.jpg@320w_320h_1e_1c',
      name: '书亦烧仙草（龙洞广金店）',
      star: 3.7,
      price: "￥ 19/人",
      address: ['龙洞/岑村', "646m"],
      item: ' 奶茶/果汁 ',
      newShop: false,
      quan: '88代100元，92代100元 ',
      jian: '买单立享满100减12 ',
      tuan: '单人餐30元，双人餐132元，4人餐216元'
    },
  ]
  return (
    <div className={Style.homeShop}>
      {
        shopData.map(item => {
          return <Shop history={props.history} key={item.id} data={item} />
        })
      }
    </div>
  )
}

export default HomeShop
