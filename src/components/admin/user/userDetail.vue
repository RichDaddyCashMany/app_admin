<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/users' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像" label-width="140px">
        <img class="head" src="../../../images/default_avatar.png" v-show="!form.avatar || form.avatar.length==0">
        <img class="head" :src="form.avatar" v-show="form.avatar && form.avatar.length>0">
      </el-form-item>
      <el-form-item label="用户ID" label-width="140px">
        <el-input v-model="form.user_id" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户名" label-width="140px">
        <el-input v-model="form.username" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="140px">
        <el-input v-model="form.nick_name" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="140px">
        <el-input v-model="form.phone" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="140px">
        <el-input v-model="form.email" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" label-width="140px">
        <el-input v-model="form.create_at" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="上次登录时间" label-width="140px">
        <el-input v-model="form.last_login_time" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="上次登录IP" label-width="140px">
        <el-input v-model="form.last_login_ip" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="到期时间" label-width="140px">
        <el-input v-model="form.expire_at" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" label-width="140px">
        <el-input v-model="form.real_name" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="身份证" label-width="140px">
        <el-input v-model="form.id_card" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="地址" label-width="140px">
        <el-input v-model="form.address" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别" label-width="140px">
        <el-input v-model="form.sex" auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import common from '../../../util/common.js'

  export default {
    data () {
      return {
        buttonLoading: false,
        form: {}
      }
    },
    created: function () {
      this.form = common.safeKeyValueAssign(this.form, this.$route.query)
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  div.container {
    width: 600px;
  }
  .head {
    width: 100px;
    height: 100px;
  }
</style>