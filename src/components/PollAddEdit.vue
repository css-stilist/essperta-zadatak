<template>
  <div class="poll-add-edit">
    <header class="poll-header">
      <div class="poll-title" :class="{'is-editing': isEditingTitle}">
        <div class="poll-title__input">
          <span class="poll-title__title" v-html="title"></span>
          <input type="text" v-model="title">
        </div>
        <button class="btn btn-action" type="button" aria-label="Uredi naslov" @click="toggleEditingTitle">
          <span class="material-icons">edit</span>
        </button>
      </div>
    </header>

    <div class="pol-add-edit__questions">
      <poll-question v-for="question, i in questions"
        :key="i"
        :order="i+1"
        :question="question"
        @edit-question="editQuestion"
      ></poll-question>
    </div>

    <button class="btn btn-primary" type="button" @click="editQuestion({})">Dodaj pitanje</button>

    <poll-question-edit v-if="editingQuestion"
      :question="editingQuestion"
      :order="editingOrder"
      :is-new="isCreatingNew"
      @cancel="cancelEditing"
      @save="addQuestion"
    ></poll-question-edit>

  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import PollQuestion from './PollQuestion.vue';
import PollQuestionEdit from './PollQuestionEdit.vue';
import MultipleChoiceModel from '../models/multiple-choice';

export default {
  name: 'poll-add-edit',
  props: {

  },
  components: {
    'poll-question': PollQuestion,
    'poll-question-edit': PollQuestionEdit,
  },
  data() {
    return {
      title: 'Nova anketa',
      isEditingTitle: false,
      questions: [
        cloneDeep(MultipleChoiceModel),
      ],
      editingQuestion: false,
      editingOrder: false,
      isCreatingNew: false,
    };
  },
  methods: {
    toggleEditingTitle() {
      this.isEditingTitle = !this.isEditingTitle;
    },
    editQuestion(question) {
      if (question.order) { // editing existing
        this.isCreatingNew = false;
        this.editingQuestion = question.question;
        this.editingOrder = question.order;
      } else { // adding new
        this.isCreatingNew = true;
        this.editingQuestion = cloneDeep(MultipleChoiceModel);
        this.editingOrder = this.questions.length;
      }
    },
    cancelEditing() {
      this.editingQuestion = false;
    },
    addQuestion(question) {
      this.questions.push(question);
      this.cancelEditing();
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-title__input {
  position: relative;

}

.poll-title {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;

  &.is-editing {

    .poll-title__title {
      display: none;
    }

  }

  &:not(.is-editing) {

    input {
      display: none;
    }

  }

}

.pol-add-edit__questions {
  margin: 30px 0;
}
</style>
