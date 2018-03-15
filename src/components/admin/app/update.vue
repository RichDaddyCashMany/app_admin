<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>版本更新</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="80px">

      <div class="card-wrap">
        <div class="box-card">
          <div class="title">
            <span>iOS</span>
          </div>
          <el-form-item label="最新版本">
            <el-input v-model="form.ios_ver"></el-input>
          </el-form-item>
          <el-form-item label="强制更新">
            <el-switch v-model="form.ios_force_update" active-value=1 inactive-value=0></el-switch>
          </el-form-item>
          <el-form-item label="更新地址">
            <el-input v-model="form.ios_update_url"></el-input>
          </el-form-item>
          <el-form-item label="更新内容">
            <el-input type="textarea" v-model="form.ios_update_content" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-switch v-model="form.ios_review" active-value=1 inactive-value=0></el-switch>
          </el-form-item>
        </div>

        <div class="box-card">
          <div class="title">
            <span>Android</span>
          </div>
          <el-form-item label="最新版本">
            <el-input v-model="form.android_ver"></el-input>
          </el-form-item>
          <el-form-item label="强制更新">
            <el-switch v-model="form.android_force_update" active-value=1 inactive-value=0></el-switch>
          </el-form-item>
          <el-form-item label="更新地址">
            <el-input v-model="form.android_update_url"></el-input>
          </el-form-item>
          <el-form-item label="更新内容">
            <el-input type="textarea" v-model="form.android_update_content" :rows="3"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存配置</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
  import api from '../../../util/api.js'

  export default {
    data () {
      return {
        form: {
          ios_ver: '',
          ios_force_update: 0,
          ios_update_url: '',
          ios_update_content: '',
          ios_review: 0,
          android_ver: '',
          android_force_update: 0,
          android_update_url: '',
          android_update_content: ''
        }
      }
    },
    methods: {
      onSubmit () {
        api.saveAppUpdate(this.form, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message('提交成功')
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
      api.appUpdate(null, (res) => {
        if (res.status === 200) {
          const data = res.data
          if (data.code === 0) {
            this.form = data.data
          } else {
            this.$message(data.message)
          }
        } else {
          this.$message('请求超时')
        }
      })
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  .card-wrap {
    display: flex;
    margin-bottom: 20px;
  }
  .box-card {
    min-width: 500px;
    margin-right: 20px;
    border: 1px solid transparent;
    padding: 20px;
    background-color: white;
    border-width: 1px;
    border-color: #f0f0f0;
  }
  .title {
    display: flex;
    justify-content: center;
    height: 40px;
    margin-bottom: 20px;
    font-size: 22px;
    color: #5a5e66;
  }
</style>