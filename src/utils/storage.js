const getItem = (key) => {
  // 获取本地内容
  const data = window.localStorage.getItem(key)
  try {
    // 返回对象内容
    return JSON.parse(data)
  } catch (err) {
    // 返回原始数据
    return data
  }
}

const setItem = (key, value) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  } catch (err) {
    console.log(err);
  }

}

const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export {
  getItem,
  setItem,
  removeItem
}
