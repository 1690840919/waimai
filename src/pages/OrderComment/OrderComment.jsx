import react, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar/AppBar'
import Style from './OrderComment.module.scss'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Field from '../../components/Field/Field'
import ToastLoading from '../../components/ToastLoading/ToastLoading'
import Toast from '../../components/Toast/Toast'
import { userCommentCreate } from '../../api/user'

function OrderComment(props) {
  const { orderInfo, location } = props
  const { id: orderId, shopInfo } = location.state || {}
  const [toastLoading, setToastLoading] = useState({ is: false, text: "" })
  const [toastInfo, setToastInfo] = useState({})
  const [submitData, setSubmitData] = useState({
    isName: true,
    commentText: '',
    star: '5,5,5',
    img: '',
    shopId: (shopInfo && shopInfo.id) || '',
    orderId: orderId || null
  })
  const history = useHistory()

  useEffect(() => {
    if (!location.state) {
      history.replace('/order')
    }
  }, [])

  // 更新提交信息
  const updateSubmitData = (type, value) => {
    const newData = { ...submitData }
    newData[type] = value
    setSubmitData(newData)
  }

  // 点击立即评价
  const handleComment = async () => {
    setToastLoading({ is: true, text: '评价中' })
    const { data } = await userCommentCreate(submitData)
    setToastLoading({ is: false })
    if (data.code !== 1000) {
      setToastInfo({
        text: data.message,
        date: new Date(),
      })
      return
    }
    setToastInfo({
      text: '评价成功',
      icon: '&#xe687;',
      date: new Date(),
      callBackFn: () => {
        history.replace('/order')
      }
    })
  }

  return (
    <div className={Style.orderComment}>
      {/* 消息加载 */}
      {
        toastLoading.is ?
          <ToastLoading text={toastLoading.text} />
          : null
      }
      {/* 消息提醒 */}
      <Toast callBackFn={toastInfo.callBackFn}
        text={toastInfo.text} isShow={toastInfo.date} icon={toastInfo.icon} />
      {/* 顶部标题 */}
      <AppBar fixed={true} handleLeft={() => { history.replace('/order') }}
        bgColor={'rgb(91,170,250)'} color={'white'} center={'订单评价'} />
      {/* 店铺评价 */}
      <div className={`${Style.box} ${Style.commentBox}`}>
        {/* 店铺信息 */}
        <div className={Style.shopInfo}>
          <div className={Style.img}>
            <img src={shopInfo && shopInfo.img} alt="" />
          </div>
          <div className={Style.name}>
            {shopInfo && shopInfo.name}
          </div>
          <div
            onClick={() => { updateSubmitData('isName', !submitData.isName) }}
            className={Style.isName}>
            <span className="iconfont"
              dangerouslySetInnerHTML={{ __html: !submitData.isName ? '&#xe678;' : '&#xe6c1;' }}></span>
            是否匿名
          </div>
        </div>
        {/* 评分信息 */}
        <div className={Style.star}>
          <div className={Style.item}>
            <span>包装</span>
            <span>5.0</span>
          </div>
          <div className={Style.item}>
            <span>味道</span>
            <span>5.0</span>
          </div>
          <div className={Style.item}>
            <span>配送</span>
            <span>5.0</span>
          </div>
        </div>
      </div>
      {/* 文字评价 */}
      <div className={Style.box}>
        <Field isTitle={false} tips={'请输入评价内容'} length={0} bg={'rgb(244,244,244)'}
          inputValue={(value) => { updateSubmitData('commentText', value) }}
        />
        <div className={Style.commentImg}>
          <div className={Style.img}>
            {
              submitData.img[0] ?
                <img src={submitData.img[0]} alt="" />
                :
                <span className="icon">+</span>
            }
          </div>
        </div>
      </div>
      {/* 评价按钮 */}
      <Button onClick={handleComment}
        width={'90%'} height={'40px'} size={'14px'} radius={'10px'}
        bgColor={'rgb(91,170,250)'} color={'white'} margin={'20px'}
        text={'立即评价'} />
    </div>
  )
}

export default connect(
  ({ orderInfo }) => ({
    orderInfo
  }),
  (dispatch) => ({
    dispatch
  })
)(OrderComment)
