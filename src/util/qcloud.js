import CosCloud from 'cos-js-sdk-v4'
import api from './api.js'

const upload = (event, success, failed) => {
  const appid = ''
  const bucket = ''
  const dir_path = '' // 文件夹
  const region = 'sh' // 区域

  const file = event.target.files[0]
  // 签名
  const cos = new CosCloud({
    appid: appid,
    bucket: bucket,
    region: sh,
    getAppSign: function (callback) {
      api.qcloudToken(null, (res) => {
        if (res.status === 200) {
          const data = res.data
          if (data.code === 0) {
            console.log('sign：' + data.data)
            callback(data.data.sign)
          } else {
            this.$message(data.message)
          }
        } else {
          this.$message('请求超时')
        }
      })
    },
    getAppSignOnce: function (callback) {
    }
  })
  // 上传
  cos.uploadFile((result) => {
    console.log('成功' + JSON.stringify(result))
    success(result.data.access_url)
  }, (result) => {
    result = result || {}
    console.log(result)
    failed()
  }, null, bucket, dir_path + new Date().getTime() + '_' + file.name, file, 1)
}

const qcloud = {
  upload: upload
}

export default qcloud
