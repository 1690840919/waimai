import React from 'react'
import Style from './ShopComment.module.scss'

function ShopComment(props) {
  const commentItemsData = ['全部', '好评', '差评', '好', '有图评价', '味道好', '分量足', '价格实惠', '主食不错', '满意']
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
        {/* 用户1 */}
        <div className={Style.commentInfo}>
          {/* 用户头像 */}
          <div className={Style.aside}>
            <div style={{ background: 'red' }} className={Style.avatar}></div>
          </div>
          {/* 用户评论 */}
          <div className={Style.content}>
            <div className={Style.nameAndTime}>
              <div className={Style.name}>世间之人</div>
              <div className={Style.time}>2021-05-20</div>
            </div>
            <p className={Style.arriveTime}>32分钟前</p>
            <p className={Style.text}>一周点好几次，不知道吃什么的时候就会点，这家店的叉烧每天的口味都不一样，有时候脆一点有时候甜一点，一吃就知道是当天现做的那种，酸菜也很爽口，emm就挺喜欢的</p>
            <div className={Style.commentImg}>
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
            </div>
          </div>
        </div>
        {/* 用户2 */}
        <div className={Style.commentInfo}>
          {/* 用户头像 */}
          <div className={Style.aside}>
            <div style={{ background: 'red' }} className={Style.avatar}></div>
          </div>
          {/* 用户评论 */}
          <div className={Style.content}>
            <div className={Style.nameAndTime}>
              <div className={Style.name}>世间之人</div>
              <div className={Style.time}>2021-05-20</div>
            </div>
            <p className={Style.arriveTime}>32分钟前</p>
            <p className={Style.text}>一周点好几次，不知道吃什么的时候就会点，这家店的叉烧每天的口味都不一样，有时候脆一点有时候甜一点，一吃就知道是当天现做的那种，酸菜也很爽口，emm就挺喜欢的</p>
            <div className={Style.commentImg}>
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
              <img src="https://img.meituan.net/msmerchant/c5a3b24ff7fe9076081c7af20d96ac7060537.png@320w_320h_1e_1c" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopComment
