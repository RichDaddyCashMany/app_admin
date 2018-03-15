<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="top-pannel">
      <el-input placeholder="请输入搜索内容" v-model="searchWords" class="input-with-select">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="username"></el-option>
          <el-option label="昵称" value="nick_name"></el-option>
          <el-option label="留言内容" value="message"></el-option>
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
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="nick_name" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="message" label="留言内容">
        <div slot-scope="scope">
          <span class="content">{{ scope.row.message }}</span>
        </div>
      </el-table-column>
      <el-table-column prop="create_at" label="发起时间" width="180">
      </el-table-column>
      <el-table-column prop="close_at" label="关闭时间" width="180">
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
        api.messageList({
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
        this.$router.push({
          name: 'messageDetail',
          query: {
            record_id: this.tableData[index]['record_id'],
            close_at: this.tableData[index]['close_at']
          }
        })
      },
      onDelete (index, row) {
        let data = this.tableData[index]
        api.deleteHomePicLink({
          record_id: data.record_id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            this.$message(data.message)
            this.request(1)
          } else {
            this.$message('请求超时')
          }
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
  span.content {
    text-overflow: -o-ellipsis-lastline;  
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>