<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/notice?type=' + form.type }">闪屏公告</el-breadcrumb-item>
      <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
      <input type="text" name="record_id" :value="form.record_id" hidden>
      <input type="text" name="type" :value="form.type" hidden>
      <el-form-item label="类型" prop="style">
        <el-radio-group v-model="form.style">
          <el-radio v-model="form.style" label="1">图片</el-radio>
          <el-radio v-model="form.style" label="0" v-show="form.type == '1'">文字</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="title" v-show="form.style=='0'">
        <el-input v-model="form.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" v-show="form.style=='0'">
        <el-input type="textarea" :rows="4" v-model="form.content" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="pic" v-show="form.style=='1'">
        <sb-upload v-model="form.pic"></sb-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="url" v-show="form.style=='1'">
        <el-input v-model="form.url" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker
          v-model="form.beginTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="form.record_id.length>0">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="form.record_id.length>0">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="2" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" :loading="buttonLoading" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import api from '../../../util/api.js'
  import sbUpload from '../../common/sbUpload.vue'
  import common from '../../../util/common.js'

  export default {
    data () {
      return {
        pageTitle: '',
        buttonLoading: false,
        form: {
          type: '0',
          record_id: '',
          style: '1',
          title: '',
          content: '',
          pic: '',
          url: '',
          beginTime: '',
          endTime: '',
          remark: ''
        },
        rules: {
          title: [
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.form.style === '0') {
                  callback(new Error('请输入公告标题'))
                } else if (value.length > 20) {
                  callback(new Error('标题长度不能大于20个字符'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          content: [
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.form.style === '0') {
                  callback(new Error('请输入公告内容'))
                } else if (value.length > 1000) {
                  callback(new Error('内容长度不能大于1000个字符'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          beginTime: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请选择开始时间'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          endTime: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请选择结束时间'))
                } else if (Date.parse(new Date(value)) <= Date.parse(new Date(this.form.beginTime))) {
                  callback(new Error('开始时间不能大于结束时间'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          pic: [
            {
              validator: (rule, value, callback) => {
                if (value === '' && this.form.style === '1') {
                  callback(new Error('请选择图片'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          url: [
            {
              validator: (rule, value, callback) => {
                /* eslint-disable */
                const regex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/
                if (value.length !== 0 &&
                  !regex.test(value) &&
                  this.form.style === '1') {
                  callback(new Error('跳转链接格式不正确'))
                }
                callback()
              },
              trigger: 'blur'
            }
          ]
        },
        notice: 'screen'
      }
    },
    components: {
      sbUpload
    },
    methods: {
      submitForm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.request()
          } else {
            this.$message('还有未完成的必填选项')
            return false
          }
        })
      },
      request () {
        this.buttonLoading = false

        api.addNotice(this.form, (res) => {
          this.buttonLoading = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message('提交成功')
              this.$router.push({
                name: 'notice',
                query: {
                  type: this.form.type
                }
              })
            } else {
              this.$message(data.message)
            }
          } else {
            this.$message('请求超时')
          }
        })
      }
    },
    created: function () {
      this.form = common.safeKeyValueAssign(this.form, this.$route.query)

      let prefix = ''
      if (this.form.record_id) {
        prefix = '编辑'
      } else {
        prefix = '添加'
      }

      if (this.form.type == '0') {
          this.pageTitle = prefix + '闪屏'
        } else if (this.form.type == '1') {
          this.pageTitle = prefix + '公告'
        } else if (this.form.type == '2') {
          this.pageTitle = prefix + 'Banner'
        }
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  div.container {
    width: 600px;
  }
</style>