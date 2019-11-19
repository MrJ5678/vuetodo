<template>
  <div id="app">
    <div id="cover">
      <Header></Header>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  #cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #999;
    opacity: 0.4;
  }
}
</style>
