<template>
  <div class="rating-list">
    <h2>{{title}}</h2>
    <div class="search">
      <i class="icofont-search"></i>
      <input type="text" v-model='inputFind' placeholder="Find..."> 
    </div>

    <div class="controls">
      <button 
        @click = 'toSortBy("age")'>
        <i class="icofont-long-arrow-down" v-show="sortBy.direction && sortBy.by === 'age'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortBy.direction && sortBy.by === 'age'"></i>
        Age
      </button>

      <button 
        @click = 'toSortBy("id")'>
        <i class="icofont-long-arrow-down" v-show="sortBy.direction && sortBy.by === 'id'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortBy.direction && sortBy.by === 'id'"></i>
        id
      </button>

      <button 
        @click = 'toSortBy("rating")'>
        <i class="icofont-long-arrow-down" v-show="sortBy.direction && sortBy.by === 'rating'"></i>
        <i class="icofont-long-arrow-up" v-show="!sortBy.direction && sortBy.by === 'rating'"></i>
        Rating
      </button>
    </div>

    <ul>
      <li v-for='(item, index) in sortedArray' :key='index'
          @click='setActiveItem(item)' >

        <div class="place">
          <div class="amount">{{item.place}} </div>
        </div>

        <div class="avatar" 
          :class='{firstPlace: item.place === 1,
                  secondPlace: item.place === 2,
                   thirdPlace: item.place === 3}'>
          {{ getFullNameChars(item) }}
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

    <transition name='slide' mode='out-in'> 
      <div class="more-info" v-if='someItemIsActive'>
        <div class="close-btn" @click='someItemIsActive = false'><i class="icofont-close"></i></div>

        <div class="place">
          <div class="amount">{{activeItem.place}} </div>
          <div class="article">place</div>
        </div>

        <div class="avatar" 
          :class='{firstPlace: activeItem.place === 1,
                  secondPlace: activeItem.place === 2,
                   thirdPlace: activeItem.place === 3}'>
          {{ getFullNameChars(activeItem) }}
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
      </div>
    </transition>
    

  </div>
</template>

<script>
export default {
  name: 'ratingList',
  props: {
    title: String,
    array: Array
  },
  data() {
    return {
      someItemIsActive: false,
      activeItem: {},
      sortBy: {
        by: '',
        direction: true // true - up, false - down
      },
      inputFind: ''
    }
  },
  computed: {
    sortedArray() {
      // Поиск по имени или фамилии
      if(this.inputFind.length > 0) {
        return this.array.filter((item) => {
          let fullName = item.name + item.secondName;
          return fullName.toLowerCase().includes(this.inputFind);
        })
      // Сортировка по рейтингу или возрасту
      } else {
        let direction = this.sortBy.direction,
            by = this.sortBy.by;

          return this.array.slice().sort((a, b) => {
            if(direction) 
              return a[by] - b[by]
            else
              return b[by] - a[by]
          })
      }
    }
  },
  methods: {
    toSortBy(by) {
      this.sortBy.by = by;
      this.sortBy.direction = !this.sortBy.direction;

      // set/remove active class
      let e = window.event,
          button = e.target,
          parentNode = button.parentNode,
          allControls = parentNode.children;

      for(let i = 0; i < allControls.length; i++) {

        if(allControls[i].classList.contains('active')) 
          allControls[i].classList.remove('active')

      }

      button.classList.add('active');
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
    }
  },
  created() {
    console.log(this.sortedArray[0].name + this.sortedArray[0].secondName )
  }
}
</script>


