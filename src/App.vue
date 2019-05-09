<template>
  <div id="app">
    <transition name='fade' mode='out-in' appear>
      
      <rating-list 
      v-if='getStatus === "default"'
      title='Рейтинг участников'>
      </rating-list>


      <div 
      class="loading-container" 
      v-else-if='getStatus === "loading"'>

        <div>
          <div class="status">{{getStatus | upperCase}} </div>
          <div class="spinner">
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle class="path" fill="none" stroke-width="2" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div> 
        </div>

      </div>
        

    </transition>
  </div>
</template>

<script>
import ratingList from './components/rating-list.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    ratingList
  },
  
  computed: {
    ...mapGetters(['getStatus']),
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase();
    }
  },
  created() {
    this.$store.dispatch('fakeRequest');
  }
}
</script>

