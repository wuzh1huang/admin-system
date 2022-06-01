<template>
  <div>
    TradeMark
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
