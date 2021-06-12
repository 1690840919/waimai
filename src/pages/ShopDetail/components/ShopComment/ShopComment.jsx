import React, { useEffect, useState } from 'react'
import { userComment } from '../../../../api/user'
import Style from './ShopComment.module.scss'
import { useRouteMatch } from 'react-router-dom'
import { Fragment } from 'react'
import { getSpecialTime, getTime } from '../../../../utils/time'

function ShopComment(props) {
  const match = useRouteMatch()
  const [commentData, setCommentData] = useState([])
  const commentItemsData = ['全部', '好评', '差评', '好', '有图评价', '味道好', '分量足', '价格实惠', '主食不错', '满意']

  useEffect(() => {
    initData()
  }, [])

  // 初始化数据
  const initData = async () => {
    const { data } = await userComment({ id: match.params.id.replace(':', '') })
    if (data.code === 1000) {
      setCommentData(data.data)
    }
  }

  return (
    <div className={Style.shopComment}>
      {/* 评分信息 */}
      <div className={Style.starInfo}>
        {/* 商品评分 */}
        <div className={Style.shopStarInfo}>
          <p className={Style.num}>4.5</p>
          <p className={Style.title}>配送评分</p>
        </div>
        {/* 星星 */}
        <div className={Style.star}>
          <p>
            <span>口味</span>
            4.0
          </p>
          <p>
            <span>口味</span>
            4.0
          </p>
          <p>
            <span>口味</span>
            4.0
          </p>
        </div>
        {/* 配送评分 */}
        <div className={Style.shopSendInfo}>
          <p className={Style.num}>5</p>
          <p className={Style.title}>配送评分</p>
        </div>
      </div>
      {/* 评价分类 */}
      <div className={Style.commentItems}>
        {
          commentItemsData.map(item => {
            return <span key={item} className={Style.item}>{item}</span>
          })
        }
      </div>
      {/* 评价信息 */}
      <div>
        {
          commentData && commentData.length ?
            <Fragment>
              {
                commentData.map(obj => (
                  <div key={obj.id} className={Style.commentInfo}>
                    {/* 用户头像 */}
                    <div className={Style.aside}>
                      <div className={Style.avatar}>
                        <img src={obj.isName ? obj.user && obj.user.avatar : 'https://img.yzcdn.cn/vant/cat.jpeg'} alt="" />
                      </div>
                    </div>
                    {/* 用户评论 */}
                    <div className={Style.content}>
                      <div className={Style.nameAndTime}>
                        <div className={Style.name}>{obj.isName ?  obj.user && obj.user.nickName : '匿名用户'}</div>
                        <div className={Style.time}>{getTime(obj.time, 'YYYY-MM-DD')}</div>
                      </div>
                      <p className={Style.arriveTime}>{getSpecialTime(obj.time)}</p>
                      <p className={Style.text}>{obj.commentText || '用户没有留下任意评价'}</p>
                      {
                        obj.img ?
                          <div className={Style.commentImg}>
                            {
                              obj.img.split(',').map(img => (
                                <img src={img} alt="" />
                              ))
                            }
                          </div>
                          : null
                      }
                    </div>
                  </div>
                ))
              }
            </Fragment>
            : null
        }
      </div>
    </div>
  )
}

export default ShopComment
