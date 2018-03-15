<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/message'}">留言列表</el-breadcrumb-item>
      <el-breadcrumb-item>留言详情</el-breadcrumb-item>
    </el-breadcrumb>
    
    <div class="page-wrap">
      <div class="msg-wrap" v-for="item in list">
        <div class="head-wrap">
          <img class="head" :src="item.avatar" v-show="item.avatar">
          <img class="head" src="../../../images/default_avatar.png" v-show="!item.avatar">
        </div>
        <div class="content-wrap">
          <div class="content-head-wrap">
            <span class="user">{{item.username?item.username:'管理员'}} :</span>
            <span class="create-time">{{item.create_at}}</span>
          </div>
          <span class="message">{{item.message}}</span>
        </div>
      </div>
      <div class="right-wrap">
      </div>
    </div>

    <div class="bottom-bar">
      <el-form :model="form" :rules="rules" ref="form" label-width="140px" class="form" v-show="!close_at">
        <el-form-item label="请输入回复内容：" prop="message">
          <el-input v-model="form.message" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import api from '../../../util/api.js'

  export default {
    data () {
      return {
        record_id: null,
        list: [],
        form: {
          message: ''
        },
        rules: {
          message: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('回复内容不能为空'))
                } else if (value.length > 1000) {
                  callback(new Error('回复内容长度不能大于1000个字符'))
                }
                callback()
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      onCurrentChange (page) {
        this.request(page)
      },
      request () {
        api.messageDetail({
          record_id: this.record_id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.list = data.data
            } else {
              this.$message(data.message)
            }
          } else {
            this.$message('请求超时')
          }
        })
      },
      addRequest () {
        api.messageAdd({
          record_id: this.record_id,
          message: this.form.message
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.form.message = ''
              this.$message(data.message)
              this.request()
            } else {
              this.$message(data.message)
            }
          } else {
            this.$message('请求超时')
          }
        })
      },
      submitForm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.addRequest()
          } else {
            return false
          }
        })
      }
    },
    created: function () {
      this.record_id = this.$route.query.record_id
      this.close_at = this.$route.query.close_at
      this.request()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  
  .page-wrap {
    display: flex;
    flex-direction: column;
  }
  .right-wrap {
    padding-left: 80px;
  }
  .msg-wrap {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .head-wrap {
    width: 100px;
    display: flex;
    justify-content: center;
  }
  .content-wrap {
    border-bottom: 1px dashed #d3d3d3;
    padding-bottom: 40px;
    width: 700px;
  }
  .content-head-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .user {
    color: #777;
    font-size: 14px;
  }
  .create-time {
    color: #777;
    font-size: 14px;
  }
  .message {
    color: #000;
    font-size: 12px;
    white-space: pre-wrap;
  }
  img.head {
    width: 40px;
    height: 40px;
  }
  .bottom-bar {
    padding-top: 20px;
    width: 100%;
    background-color: white;
    position: sticky;
    left: 0;
    bottom: 0;
    z-index: 999;
  }
  .el-form {
    width: 800px;
  }
</style>