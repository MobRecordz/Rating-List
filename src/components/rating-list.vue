<template>
  <div class="rating-list">
    <h2>{{title}}</h2>
    <div class="search">
      <i class="icofont-search"></i>
      <input type="text" v-model='searchInput' placeholder="Find..."> 
    </div>

    <div class="controls" ref='controls'>
      <button 
        @click = 'toSortBy("age", $event.currentTarget)'>
        <i class="icofont-long-arrow-down" v-show="sortingData.direction && sortingData.by === 'age'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortingData.direction && sortingData.by === 'age'"></i>
        Age
      </button>

      <button 
        @click = 'toSortBy("id", $event.currentTarget)'>
        <i class="icofont-long-arrow-down" v-show="sortingData.direction && sortingData.by === 'id'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortingData.direction && sortingData.by === 'id'"></i>
        id
      </button>

      <button 
        @click = 'toSortBy("rating", $event.currentTarget)'>
        <i class="icofont-long-arrow-down" v-show="sortingData.direction && sortingData.by === 'rating'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortingData.direction && sortingData.by === 'rating'"></i>
        Rating
      </button>
    </div>

    <ul>
      <li v-for='(item, index) in getSortedArray' :key='index'
          @click='setActiveItem(item)' >

        <div class="place">
          <div class="amount">{{item.place}} </div>
        </div>

        <div class="avatar-container">
          <div class="avatar" 
            :class='{firstPlace: item.place === 1,
                    secondPlace: item.place === 2,
                    thirdPlace: item.place === 3}'>
            {{ getFullNameChars(item) }}
          </div>
        </div>

        <div class="full-name">{{item.name}} {{item.secondName}}</div>
        <div class="age">
          <div class="amount">{{item.age}} </div>
          <div class="article">age</div>
        </div>
        
        <div class="uid">
          <div class="amount">{{item.id}} </div>
          <div class="article">id</div>
        </div>
        
        <div class="rating">
          <div class="amount">{{item.rating}} </div>
          <div class="article">rating</div>
        </div>
        <!-- {{ item }} -->
      </li>
    </ul>

    <transition name='slide'> 
      <div class="more-info" v-if='someItemIsActive'>

        <div class="place">
          <div class="amount">{{activeItem.place}} </div>
          <div class="article">place</div>
        </div>

        <div class="avatar-container">
          <div class="avatar" 
            :class='{firstPlace: activeItem.place === 1,
                    secondPlace: activeItem.place === 2,
                    thirdPlace: activeItem.place === 3}'>
            {{ getFullNameChars(activeItem) }}
          </div>
        </div>
       

        <div class="full-name">{{activeItem.name}} {{activeItem.secondName}}</div>

        <div class="age">
          <div class="amount">{{activeItem.age}} </div>
          <div class="article">age</div>
        </div>

        <div class="uid">
          <div class="amount">{{activeItem.id}} </div>
          <div class="article">id</div>
        </div>

        <div class="rating">
          <div class="amount">{{activeItem.rating}} </div>
          <div class="article">rating</div>
        </div>
        
        <div class="close-btn" @click='someItemIsActive = false'><i class="icofont-close"></i></div>
      </div>
    </transition>
    

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  name: 'ratingList',
  props: {
    title: {
      type: String,
      default: 'Рейтинг'
    },
  },
  data() {
    return {
      someItemIsActive: false,
      activeItem: {},
      sortingData: {
        by: '',
        direction: true // true - up, false - down
      },
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters(['getSortedArray']),
  },
  watch: {
    searchInput(value) {
      this.CHANGE_SEARCH_INPUT(value);
    }
  },
  methods: {
    ...mapMutations(['CHANGE_SORTING_DATA', 'CHANGE_SEARCH_INPUT']),

    toSortBy(by, clickedElement) {

      this.sortingData.by = by;
      this.sortingData.direction = !this.sortingData.direction;

      this.CHANGE_SORTING_DATA({by, direction: this.sortingData.direction});
      
      // set/remove active class
      let controls = this.$refs.controls.childNodes;

      for(let i = 0; i < controls.length; i++) {

        if(controls[i].classList.contains('active')) 
          controls[i].classList.remove('active')
        
      }

      clickedElement.classList.add('active')
    },
    getFullNameChars(item) {
      let a = item.name.charAt(0).toUpperCase(),
          b = item.secondName.charAt(0).toUpperCase();

      return a+b;
    },
    setActiveItem(item) {
      if(this.activeItem === item)
        this.someItemIsActive = !this.someItemIsActive;
      else 
        this.someItemIsActive = true;

      this.activeItem = item;
    },
  }
}
</script>


