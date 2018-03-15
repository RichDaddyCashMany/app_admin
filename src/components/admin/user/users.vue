<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="top-pannel">
      <el-input placeholder="请输入搜索内容" v-model="searchWords" class="input-with-select">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="username"></el-option>
          <el-option label="昵称" value="nick_name"></el-option>
          <el-option label="手机号码" value="phone"></el-option>
          <el-option label="邮箱" value="email"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
      </el-input>
    </div>
    
    <el-table :data="tableData">
      <el-table-column prop="avatar" label="头像" width="100">
        <div slot-scope="scope">
          <img class="head" :src="scope.row.avatar" v-show="scope.row.avatar && scope.row.avatar.length>0">
          <img class="head" src="../../../images/default_avatar.png" v-show="!scope.row.avatar || scope.row.avatar.length==0">
        </div>
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="nick_name" label="昵称" width="140">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="140">
      </el-table-column>
      <el-table-column prop="create_at" label="注册时间" width="180">
      </el-table-column>
      <el-table-column prop="last_login_time" label="最后登录" width="180">
      </el-table-column>
      <el-table-column prop="expire_at" label="到期时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <div slot-scope="scope">
          <el-button
          size="mini" 
          @click="onDetail(scope.$index, scope.row)">更多
          </el-button>
        </div>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="pages"
        @current-change="onCurrentChange">
      </el-pagination>
      <p class="count">共{{pages}}条记录</p>
    </div>

  </div>
</template>

<script>
  import api from '../../../util/api.js'

  export default {
    data () {
      return {
        noticeType: '0',
        tableData: null,
        pages: 0,
        searchType: 'username',
        searchWords: ''
      }
    },
    methods: {
      onCurrentChange (page) {
        this.request(page)
      },
      request (page) {
        const size = 10
        api.userList({
          page: page,
          size: size,
          searchType: this.searchType,
          searchWords: this.searchWords
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.tableData = data.data.list
              this.pages = data.data.totalCount
            } else {
              this.$message(data.message)
            }
          } else {
            this.$message('请求超时')
          }
        })
      },
      onDetail (index, row) {
        console.log(this.tableData[index])
        this.$router.push({
          name: 'userDetail',
          query: this.tableData[index]
        })
      },
      onSearch () {
        this.request(1)
      }
    },
    created: function () {
      this.request(1)
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  
  .top-pannel {
    margin-bottom: 30px;
    width: 600px;
  }
  img.head {
    width: 40px;
    height: 40px;
  }
</style>