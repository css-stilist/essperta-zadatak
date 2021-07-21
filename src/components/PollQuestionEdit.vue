<template>
  <div class="poll-question-edit modal" :class="elClass">
    <div class="question-edit__wrap">
      <header>
        <!-- some actions here -->
      </header>
      <div class="question-edit__body">
        <div>
          {{order}}. <input type="text" v-model="editingQuestion.text">
        </div>

        <ul>
          <li v-for="option,i in editingQuestion.options" :key="i">
            <label>
              <input type="checkbox">
              <input type="text" v-model="option.text">
              <button class="btn btn-action" type="button" aria-label="Obriši odgovor"><span class="material-icons">close</span></button>
            </label>
          </li>
        </ul>

        <div class="columns">
          <div class="column">
            <button type="button" class="btn btn-primary" @click="addOption">
              <span class="material-icons">add</span> Dodaj odgovor
            </button>
          </div>
          <div class="column">
            <button type="button" class="btn btn-primary">
              <span class="material-icons">add</span> Dodaj opciju "Drugo"
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" v-model="editingQuestion.isMultipleChoice">
            <i class="form-icon"></i> Višestruki odabir
          </label>
        </div>
      </div>
      <footer class="question-edit__footer">
        <div class="columns">
          <div class="column">
            <div class="form-group">
              <label class="form-switch">
                <input type="checkbox" v-model="editingQuestion.isRequired">
                <i class="form-icon"></i> Obavezan odgovor
              </label>
            </div>
          </div>
          <div class="column">
            <button class="btn" type="button" @click="cancel">Odustani</button>
            <button class="btn btn-primary" type="button" @click="save">Spremi</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/**
 * In real world scenario this would be a higher level component which would load apropriate component depending on question type
 * Since this is just a quick demo it will work only with multiple-choice type questions
 */
import { cloneDeep } from 'lodash-es';

export default {
  name: 'poll-question-edit',
  props: {
    order: { type: Number, required: true },
    question: { type: Object, required: false },
    isNew: { type: Boolean, required: false },
  },
  data() {
    return {
      editingQuestion: {},
    };
  },
  computed: {
    elClass() {
      return {
        active: true,
      };
    },
  },
  created() {
    if (this.isNew) {
      this.editingQuestion = cloneDeep(this.question);
    } else {
      this.editingQuestion = this.question;
    }
  },
  methods: {
    addOption() {
      this.editingQuestion.options.push({
        text: `Odgovor ${this.editingQuestion.options.length + 1}`,
        isCorrect: false,
        isSelected: false,
      });
    },
    cancel() {
      this.$emit('cancel');
    },
    save() {
      if (this.isNew) {
        this.$emit('save', this.editingQuestion);
      } else {
        // changes are already done on question prop so we don't need to to anything else here
        // this is not a great practice, but is sufficient for this demo project
        this.cancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-question-edit {
  background-color: rgba(#000, 0.5);
}

.question-edit__wrap {
  background-color: #fff;
  min-width: 666px;
  max-width: 800px;
  margin: 0 auto;
}

.question-edit__body {
  padding: 15px;
}

.question-edit__footer {
  padding: 15px;
  border-top: 1px solid #eee;
}
</style>
