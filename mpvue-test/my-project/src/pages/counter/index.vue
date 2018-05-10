<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>Vuex counter:{{count+2}}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="gettext">text</button>
    </p>

    <a href="/pages/index/index" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  data() {
    return {
      sid:1
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    gettext () {
      wx.request({
        url:'http://localhost:8010/api1/student/',
        method:"GET",
        data:{},
        header: {'Content-Type': 'application/json'},
        success: function(res) {
          console.log(res)
        }
      })
    }
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
