import react from 'react'
import Style from './LoadingDataNull.module.scss'
import DataNull from '../DataNull/DataNull'
import Loading from '../Loading/Loading'
function LoadingDataNull(props) {
  const { loading = true, dataNull = false, padding } = props
  return (
    <div className={Style.loadingDataNull}>
      <Loading padding={padding} tip={!dataNull} loading={loading} />
      {
        dataNull ?
          <DataNull />
          : null
      }
    </div>
  )
}

export default LoadingDataNull
