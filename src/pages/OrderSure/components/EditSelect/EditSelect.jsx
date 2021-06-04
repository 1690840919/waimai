import react, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import Style from './EditSelect.module.scss'
function EditSelect(props) {
  const { value, update, closePopup, data } = props
  const [currentSelect, setCurrentSelect] = useState("")

  // 初始化选项
  useEffect(() => {
    setCurrentSelect(value)
  }, [value])

  // 点击变化
  const handleChange = (value) => {
    setCurrentSelect(value)
    update(value)
    closePopup()
  }


  return (
    <div className={Style.editGender}>
      <form>
        {
          data ?
            <Fragment>
              {
                data.map(obj => (
                  <label key={obj.value} htmlFor="boy">
                    <div className={Style.radio}>
                      {
                        obj.icon ?
                          <div className={Style.icon}>
                            <span className="iconfont"
                              style={{color:obj.iconColor}}
                              dangerouslySetInnerHTML={{ __html: obj.icon }}></span>
                          </div>
                          : null
                      }
                      <div style={{ marginLeft: obj.icon ? '30px' : null }}
                        className={Style.title}>{obj.title}</div>
                      <input id='boy' name='select' value={obj.value}
                        onChange={(e) => { handleChange(e.target.value) }}
                        type="radio" checked={currentSelect === obj.value} />
                    </div>
                  </label>
                ))
              }
            </Fragment>
            : null
        }

      </form>
    </div>
  )
}

export default EditSelect
