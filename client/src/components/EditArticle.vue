<template>
  <div class="modal fade" id="editArticleModal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit Article</h4>
        </div>
        <div class="modal-body form-group text-left">
          <label for="title">Title :</label>
          <input type="text" class="form-control" v-model="title"><br>
          <label for="content">Content :</label>
          <textarea class="form-control" rows="10" v-model="content" style="resize: none;"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="editArticle()">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editArticle',
  props: ['article'],
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    editArticle: function () {
      let article = {
        title: this.title,
        content: this.content
      }
      console.log(article)
      // this.$store.dispatch('createArticle', article)
    }
  },
  mounted: function () {
    this.title = this.article.title
    this.details = this.article.details
    // console.log('Edit Question', this.question)
  }
}
</script>

<style>

</style>
