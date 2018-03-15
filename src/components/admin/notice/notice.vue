<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>闪屏公告</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="top-pannel">
      <el-radio-group v-model="noticeType" @change="onNoticeTypeChange">
        <el-radio-button label="0">闪屏</el-radio-button>
        <el-radio-button label="1">公告</el-radio-button>
        <el-radio-button label="2">Banner</el-radio-button>
      </el-radio-group>
      <el-button type="primary" size="medium" @click='addNotice'>添加</el-button>
    </div>
    
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column prop="content" label="内容">
        <div slot-scope="scope">
          <img class="pic" :src="scope.row.picture_url" v-show="scope.row.picture_url">
          <span class="content" v-show="scope.row.content">{{ scope.row.content }}</span>
        </div>
      </el-table-column>
      <el-table-column prop="begin_time" label="开始时间" width="180">
      </el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="180">
      </el-table-column>
      <el-table-column prop="enable" label="状态" width="100">
        <span slot-scope="scope">{{ timeToTimestamp(new Date()) > timeToTimestamp(scope.row.end_time) ? '过期' : (scope.row.enable === 0 ? '下线' : '上线')}}</span>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <div slot-scope="scope">
          <el-button
          size="mini" 
          @click="onEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger" 
            @click="onOffNotice(scope.$index, scope.row)"
            :disabled="scope.row.enable === 0 || timeToTimestamp(new Date()) > timeToTimestamp(scope.row.end_time)">下线
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
        pages: 0
      }
    },
    methods: {
      onCurrentChange (page) {
        this.request(page)
      },
      request (page) {
        const size = 10
        api.noticeList({
          page: page,
          size: size,
          type: this.noticeType
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
      onNoticeTypeChange () {
        this.$router.push({
          name: 'notice',
          query: {
            type: this.noticeType
          }
        })
        this.request(1)
      },
      addNotice () {
        this.$router.push({
          name: 'addNotice',
          query: {
            type: this.noticeType
          }
        })
      },
      onEdit (index, row) {
        const data = this.tableData[index]
        const form = {
          type: this.noticeType,
          record_id: data.record_id,
          style: data.title ? '0' : '1',
          beginTime: data.begin_time,
          endTime: data.end_time,
          title: data.title,
          content: data.content,
          pic: data.picture_url,
          url: data.url,
          remark: data.remark
        }
        this.$router.push({
          name: 'addNotice',
          query: form
        })
      },
      onOffNotice (index, row) {
        this.$confirm('是否下线该公告？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'default'
        }).then(() => {
          const data = this.tableData[index]
          api.offnotice(data, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                this.$message('下线成功')
                this.request(1)
              } else {
                this.$message(data.message)
              }
            } else {
              this.$message('请求超时')
            }
          })
        }).catch(() => {
        })
      },
      timeToTimestamp (time) {
        return Date.parse(new Date(time)) / 1000
      }
    },
    created: function () {
      this.noticeType = this.$route.query['type'] ? this.$route.query['type'] : 0
      this.request(1)
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  .top-pannel {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  img.pic {
    max-width: 178px;
    max-height: 178px;
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