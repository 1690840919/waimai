import react, { useEffect, useState } from 'react'
import Style from './Star.module.scss'

function Star(props) {
  const { value = 5, size, onChange,isEdit = false } = props
  const [data, setData] = useState()
  const [star, setStar] = useState([0, 1, 2, 3, 4])

  useEffect(() => {
    setData(value)
  }, [value])

  const handleStar = (num) => {
    if(!isEdit){
      return
    }
    setData(num)
    onChange && onChange(num)
  }

  return (
    <div className={Style.star}>
      {
        star.map(num => (
          <span
            key={num}
            onClick={() => { handleStar(num + 1) }}
            style={{
              color: data > num ? 'red' : 'rgb(218,218,218)',
              fontSize: size
            }}
            className="iconfont">&#xe642;</span>
        ))
      }
    </div>
  )
}

export default Star
