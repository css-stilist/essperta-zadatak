<template>
  <div class="poll-add-edit">
    <header class="poll-header">
      <div class="poll-title" :class="{'is-editing': isEditingTitle}">
        <form @submit="toggleEditingTitle">
          <div class="poll-title__input">
            <span class="poll-title__title" v-html="title"></span>
            <input ref="input" type="text" v-model="title">
          </div>
          <button class="btn btn-action" type="button" aria-label="Uredi naslov" @click="toggleEditingTitle">
            <span class="material-icons">{{editingTitleIcon}}</span>
          </button>
        </form>
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

    <button class="btn btn-primary" type="button" @click="editQuestion({})"><span class="material-icons">add</span>Dodaj pitanje</button>

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
import { EventBus } from './EventBus';

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
  computed: {
    editingTitleIcon() {
      return this.isEditingTitle ? 'done' : 'edit';
    },
  },
  methods: {
    toggleEditingTitle(e) {
      this.isEditingTitle = !this.isEditingTitle;

      if (this.isEditingTitle) {
        setTimeout(() => {
          this.$refs.input.focus();
        }, 0);
      } else {
        e.preventDefault();
        EventBus.$emit('save-poll-title', this.title);
      }
    },
    editQuestion(question) {
      if (question.order) { // editing existing
        this.isCreatingNew = false;
        this.editingQuestion = question.question;
        this.editingOrder = question.order;
      } else { // adding new
        this.isCreatingNew = true;
        this.editingQuestion = cloneDeep(MultipleChoiceModel);
        this.editingOrder = this.questions.length + 1;
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

.poll-add-edit {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(#000, 0.1);
}

.poll-title__input {
  position: relative;

}

.poll-title {
  max-width: 500px;
  margin: 0 auto;
  padding: 5px 5px 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 26px;
  display: flex;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  input {
    width: 100%;
    padding: 0 0 0 10px;
    border: none;
    background-color: #fafafa;
  }

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

.poll-title__input {
  padding-right: 10px;
  flex-grow: 1;
}

.pol-add-edit__questions {
  margin: 30px 0;
}
</style>
