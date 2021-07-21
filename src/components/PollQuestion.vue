<template>
  <div class="poll-question">
    <button class="btn btn-action poll-question__edit" type="button" aria-label="Uredi pitanje" @click="edit">
      <span class="material-icons">edit</span>
    </button>
    <div>
      <p><strong>{{order}}.</strong> {{question.text}}</p>
    </div>
    <ul>
      <li v-for="option, i in question.options" :key="i">
        <label>
          <input type="checkbox"> {{option.text}}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * In real world scenario this would be a higher level component which would load apropriate component depending on question type
 * Since this is just a quick demo it will work only with multiple-choice type questions
 */
export default {
  data() {
    return {

    };
  },
  props: {
    order: { type: Number, required: true },
    question: { type: Object, required: true },
  },
  methods: {
    edit() {
      this.$emit('edit-question', {
        order: this.order,
        question: this.question,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-question {
  padding: 15px;
  border: 1px solid #eee;
  position: relative;
}

.poll-question__edit {
  position: absolute;
  top: 15px;
  right: 15px;
}

ul {
  padding: 0 0 0 1rem;
  margin: 0;
  list-style: none;
}
</style>
