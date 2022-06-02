<template>
  <div>
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0" @click="addOrRevise(true)">添加</el-button>
    <!-- 表格：展示品牌列表 -->
    <el-table
      :data="records"
      style="width: 100%"
      border
    >
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      />
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      />
      <el-table-column
        prop="prop"
        label="品牌LOGO"
        width="width"
      >
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" style="height:80px">
        </template>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
      >
        <template slot-scope="{ row }">
          <el-button type="warning" icon="el-icon-edit" size="small" @click="addOrRevise(false, row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="removeTradeMar(row.id)">删除</el-button>
        </template>
      </el-table-column></el-table>
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev,pager,next,jumper,->,total,sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 对话框：添加/删除品牌 -->
    <el-dialog :title="isAdd?'添加品牌':'修改品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width:80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="form.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="url"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrReviseConfirmation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 图片上传接口
      url: process.env.VUE_APP_BASE_API + '/admin/product/fileUpload',
      // 修改/删除 操作的id
      id: -1,
      // 显示/隐藏dialog
      dialogFormVisible: false,
      // 添加？/修改？
      isAdd: true,
      // 添加/修改 数据
      form: {
        tmName: '',
        logoUrl: ''
      },
      // 分页器相关
      page: 1,
      limit: 3,
      total: 0,
      // 品牌列表数据
      records: []
    }
  },
  mounted() {
    this.getTradeMark()
  },
  methods: {
    // 发送请求获取品牌列表
    async getTradeMark() {
      const result = await this.$API.tradeMark.reqTradeMark(this.page, this.limit)
      this.total = result.data.total
      this.records = result.data.records
    },
    // 分页器显示条数limit改变
    handleSizeChange(limit) {
      this.limit = limit
      this.getTradeMark()
    },
    // 分页器展示页码page改变
    handleCurrentChange(page) {
      this.page = page
      this.getTradeMark()
    },
    // 判读是添加还是修改操作
    addOrRevise(isAdd, row) {
      this.isAdd = isAdd
      if (row) {
        this.id = row.id
        this.form = {
          tmName: row.tmName,
          logoUrl: row.logoUrl
        }
      }
      this.dialogFormVisible = true
    },
    // 上传图片 品牌LOGO 成功
    handleAvatarSuccess(res, file) {
      this.form.logoUrl = res.data
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 确定
    addOrReviseConfirmation() {
      this.dialogFormVisible = false
      if (this.isAdd) {
        this.$API.tradeMark.reqAddTradeMark(this.form).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getTradeMark()
        })
      } else {
        this.$API.tradeMark.reqReviseTradeMark({ ...this.form, id: this.id }).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getTradeMark()
        })
      }
    },
    // 删除
    removeTradeMar(id) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$API.tradeMark.reqRemoveTradeMark(id).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getTradeMark()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
