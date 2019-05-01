<template>
  <div id="app">

    <rating-list 
    title='Рейтинг участников'
    :array='getUsersList'>

    </rating-list>

  </div>
</template>

<script>
import ratingList from './components/rating-list.vue'

export default {
  name: 'app',
  components: {
    ratingList
  },
  
  computed: {
    getUsersList() {
      return this.$store.getters.getUsersList
    }
  },
  created() {
    this.$store.dispatch('fakeRequest');
  }
}
</script>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
