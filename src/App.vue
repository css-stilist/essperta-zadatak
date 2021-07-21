<template>
  <div id="app">
    <div class="container">
      <h1>Ankete</h1>

      <div>
        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Ankete</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#">Nova anketa</a>
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

    };
  },
};
</script>

<style>
.btn {
  display: inline-flex;
  align-items: center;
}

.btn-action {
  justify-content: center;
}
</style>
