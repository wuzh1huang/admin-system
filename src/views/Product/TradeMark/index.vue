<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0">添加</el-button>
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
        <el-button type="warning" icon="el-icon-edit" size="small">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      records: []
    }
  },
  mounted() {
    this.getTradeMark()
  },
  methods: {
    async getTradeMark() {
      const result = await this.$API.tradeMark.reqTradeMark(this.page, this.limit)
      this.total = result.data.total
      this.records = result.data.records
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getTradeMark()
    },
    handleCurrentChange(page) {
      this.page = page
      this.getTradeMark()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
