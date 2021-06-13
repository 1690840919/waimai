import React, { useEffect, useState } from 'react'
import { userComment } from '../../../../api/user'
import Style from './ShopComment.module.scss'
import { useRouteMatch } from 'react-router-dom'
import { Fragment } from 'react'
import { getSpecialTime, getTime } from '../../../../utils/time'
import LoadingDataNull from '../../../../components/LoadingDataNull/LoadingDataNull'
import Star from '../../../../components/Star/Star'

function ShopComment(props) {
  const match = useRouteMatch()
  const [commentData, setCommentData] = useState([])
  const commentItemsData = ['全部', '好评', '差评', '好', '有图评价', '味道好', '分量足', '价格实惠', '主食不错', '满意']
  const [dataNull, setDataNull] = useState({ loading: true, dataNull: false })
  useEffect(() => {
    initData()
  }, [])

  // 初始化数据
  const initData = async () => {
    const { data } = await userComment({ id: match.params.id.replace(':', '') })
    setDataNull({ loading: false, dataNull: false })
    if (data.code === 1000) {
      setCommentData(data.data)
      if (data.data && !data.data.length) {
        setDataNull({ loading: false, dataNull: true })
      }
    }
  }

  return (
    <div className={Style.shopComment}>
      {/* 评分信息 */}
      <div className={Style.starInfo}>
        {/* 商品评分 */}
        <div className={Style.shopStarInfo}>
          <p className={Style.num}>4.5</p>
          <p className={Style.title}>店铺评分</p>
        </div>
        {/* 星星 */}
        <div className={Style.star}>
          <p>
            <span className={Style.name}>口味</span>
            <Star value={5}/>
          </p>
          <p>
            <span className={Style.name}>配送</span>
            <Star value={4}/>
          </p>
          <p>
            <span className={Style.name}>包装</span>
            <Star value={3}/>
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
                        <div className={Style.name}>{obj.isName ? obj.user && obj.user.nickName : '匿名用户'}</div>
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
        <LoadingDataNull padding={'0px'} loading={dataNull.loading} dataNull={dataNull.dataNull} />
      </div>
    </div>
  )
}

export default ShopComment
