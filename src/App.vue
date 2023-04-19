<script setup>
import { Spin as aSpin, BackTop as aBackTop } from 'ant-design-vue'
import { useLoadingStore } from '@/stores/loading'

const store = useLoadingStore()
</script>

<template>
  <header>
    <div class="container">
      <div class="title"><router-link to="/">Mirrors China</router-link></div>
      <div class="title-desc">——开源软件的国内镜像站点</div>
    </div>
  </header>
  <div class="main">
    <a-spin tip="Loading..." :spinning="store.isLoading" style="margin: 20px">
      <div class="content">
        <a-back-top />
        <router-view />
      </div>
    </a-spin>
  </div>

  <div class="footer">
    Original from
    <a href="https://github.com/lework/lemonitor" target="_blank">lework/lemonitor</a>, customed by
    <a href="https://github.com/tianheg/lemonitor" target="_blank">tianheg/lemonitor</a>
  </div>
</template>

<style lang="scss" scoped>
$min-width: 1000px;

header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #fff;
}

.container {
  height: 100%;

  margin: 0 auto;
  padding: 0 10px;
  border-bottom: 1px solid #dcdfe6;

  display: flex;
  justify-content: center;

  @media (min-width: $min-width) {
    width: 1140px;
  }

  // @media (max-width: 384px) {
  //   
  // }
  // width < 384px, title,title-desc wrap
}

.title {
  color: #409eff;
  font-size: 26px;
  font-weight: 500;

  a {
    color: #409eff;
    text-decoration: none;
  }
}

.title-desc {
  display: inline;
  color: rgba(0, 0, 0, 0.45);
  margin-left: 10px;
  padding-top: 10px;
  font-size: 14px;
}

.main {
  position: relative;

  height: calc(100% - 80px);
  margin: 0 auto;
  padding: 10px 0;
  top: 80px;

  @media (min-width: $min-width) {
    width: 1140px;
  }
}

.footer {
  text-align: center;
  margin-top: 70px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
