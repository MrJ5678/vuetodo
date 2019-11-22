<template>
  <div id="app">
    <div id="cover">
      <Header></Header>
      <todo></todo>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from "./layout/header.vue";
import Todo from "./views/todo/todo.vue"
import Footer from "./layout/footer.jsx";

export default {
  components: {
    Header,
    Todo,
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
    opacity: 0.8;
  }
}
</style>
