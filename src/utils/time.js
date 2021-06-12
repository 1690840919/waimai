/**
 * 
 * @param {number}} time 时间戳
 * @param {string} format YY-MM-DD hh:mm:ss 格式
 * @returns 
 */
export const getTime = (time, format) => {
  const date = new Date(time * 1)
  if (/(y+|Y+)/.test(format)) {
    format = format.replace(RegExp.$1, date.getFullYear() + '')
  }
  const obj = {
    'M+': date.getMonth() + 1,
    'd+|D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(format)) {
      const str = obj[key] + ''
      format = format.replace(
        RegExp.$1, (RegExp.$1.length === 1) ?
        str : ('00' + str).substr(str.length)
      )
    }
  }
  return format
}

export const getSpecialTime = (oldTime) => {
  const nowTime = (new Date()).getTime()
  const time = Math.floor((nowTime - oldTime) / 1000)
  let res
  if (time > 90 * 24 * 60 * 60) {
    res = "3个月前"
  }
  else if (time > 30 * 24 * 60 * 60) {
    res = "1个月前"
  }
  else if (time > 3 * 24 * 60 * 60) {
    res = "3天前"
  }
  else if (time > 24 * 60 * 60) {
    res = "1天前"
  }
  else if (time > 3 * 60 * 60) {
    res = "3小时前"
  }
  else if (time > 1 * 60 * 60) {
    res = "1小时前"
  }
  else if (time > 60) {
    const n = Math.floor(time / 60)
    res = `${n}分钟前`
  }else{
    res = `${time}秒前`
  }
  return res
}
