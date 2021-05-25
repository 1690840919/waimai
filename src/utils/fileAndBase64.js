export const getBase64 = (file, callBackFn) => {
  // 转换为base64
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const url = e.target.result
    callBackFn(url)
  }
}

export const getFile = (url, filename) => {
  const arr = url.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime })
}
