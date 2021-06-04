const formatMoney = (money) => {
  const arr = (money*1).toFixed(4).split('.')
  arr[1] = arr[1].slice(0,2)
  const str = arr.join('.')
  return str
}

export default formatMoney
