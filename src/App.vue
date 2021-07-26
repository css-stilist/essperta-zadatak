<template>
  <div id="app">
    <div class="container">
      <header class="app-header">
        <h1>Ankete</h1>
      </header>

      <div>
        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Ankete</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">{{title}}</a>
          </li>
        </ul>
      </div>

      <poll-steps></poll-steps>

      <poll-add-edit></poll-add-edit>

      <poll-results></poll-results>

    </div>
  </div>
</template>

<script>
import PollSteps from './components/PollSteps.vue';
import PollAddEdit from './components/PollAddEdit.vue';
import PollResults from './components/PollResults.vue';
import { EventBus } from './components/EventBus';

export default {
  name: 'App',
  components: {
    'poll-steps': PollSteps,
    'poll-add-edit': PollAddEdit,
    'poll-results': PollResults,
  },
  data() {
    return {
      step: 0,
      title: 'Nova anketa',
    };
  },
  mounted() {
    EventBus.$on('save-poll-title', (title) => {
      this.title = title;
    });
  },
};
</script>

<style>
.app-header {
  padding: 15px 0;
}

.container {
  max-width: 900px;
}

.btn {
  display: inline-flex;
  align-items: center;
}

.btn-action {
  justify-content: center;
}
</style>
