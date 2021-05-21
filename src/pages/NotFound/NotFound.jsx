import React, { Component } from 'react'
import { connect } from 'react-redux'
import Style from './NotFound.module.scss'

class NotFound extends Component {
  render() {
    return (
      <div className={Style.notFound}>
        <p>404 </p>
        <p>没有找到页面</p>
      </div>
    )
  }
}


export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(NotFound)

