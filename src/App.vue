<script>
export default {
  data() {
    return {
      loading: false,
      loaded: false,
      display: false,
      ended: false
    }
  },
  beforeCreate() {
      setTimeout(() => {
        this.loading = true
      }, 10)
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true
      this.display = true
    }, 1500)

    this.$router.beforeEach(() => {
      this.display = false;
      this.loaded = false;
      this.loading = false;
      this.ended = false;

      setTimeout(() => {
        this.loading = true
      }, 1)

      setTimeout(() => {
        this.loaded = true
        this.display = true
      }, 1500)

      setTimeout(() => {
        this.ended = true
      }, 2500)
    })
  },
}
</script>

<template>
    <router-view></router-view>
</template>

<style scoped>
</style>
