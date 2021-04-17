import React, { Component } from 'react'
import { connect } from 'react-redux'


class NotFound extends Component {
  render() {
    return (
      <div>
        404 没有找到页面
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

