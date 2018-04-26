<template>
  <main role="main" class="container text-center">
    <div class="row">
      <div class="col-md-8 blog-main text-left">
          <div class="blog-post">
              <div class="text-right">
                <div class="btn-group">
                  <button class="btn btn-default btn-sd" data-toggle="modal" data-target="#editArticleModal">Edit Article</button>
                  <button class="btn btn-default btn-sd" @click="deleteArticle">Delete Article</button>
                </div>
              </div>
              <h2 class="blog-post-title">{{ article.title }}</h2>
              <p class="blog-post-meta">{{ dateFormat(article.createdAt) }} by <a href="#">{{ article.author.name }}</a></p>
              <p>{{ article.content }}</p>
          </div>
      </div>
    </div>
    <ArticleDetail :article="article" />
  </main>
</template>

<script>
import {mapState} from 'vuex'
import swal from 'sweetalert'
import ArticleDetail from '@/components/ArticleDetail.vue'

export default {
  name: 'articleDetail',
  props: ['id'],
  components: {
    ArticleDetail
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    getArticle: function () {
      let article = this.articles.filter(article => article._id === this.id)[0]
      console.log(article)
      this.article = article
      return article
    },
    deleteArticle: function () {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this Article`,
        icon: 'warning',
        buttons: [true, 'Yes Delete it']
      }).then(result => {
        if (result) {
          this.$store.dispatch('deleteArticle', this.id)
        }
      })
    },
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
  updated: function () {
    this.getArticle()
  },
  created: function () {
    this.getArticle()
  },
  computed: mapState([
    'articles'
  ])
}
</script>

<style>

</style>
