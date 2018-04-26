<template>
  <div class="home container text-left">
    <div class="card flex-md-row mb-4 box-shadow h-md-250" v-for="(article, index) in articles" :key="index">
      <div class="card-body d-flex flex-column align-items-start">
        <h3>
          <!-- <a class="text-dark" href="#">{{ article.title }}</a> -->
          <router-link :to="{name: 'articleDetail', params: {id: article._id}}">{{ article.title }}</router-link>
        </h3>
        <h5 class="text-muted"><span class="glyphicon glyphicon-time"></span> {{ dateFormat(article.createdAt) }} Created By {{ article.author.name }}</h5>
        <p class="card-text mb-auto">{{ article.content }}</p>
        
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'home',
  methods: {
    dateFormat: function (date) {
      let newDate = new Date(date)
      let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      let year = newDate.getFullYear()
      let month = monthArr[newDate.getMonth()]
      let day = newDate.getDate()

      newDate = `${month} ${day}, ${year}`

      return newDate
    }
  },
  computed: mapState([
    'articles'
  ])
}
</script>
