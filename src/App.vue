<template>
  <div id="app">
    <header class="app-header">
      <h1>Ankete</h1>
    </header>

    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Ankete</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/poll/1">{{title}}</router-link>
        </li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<script>
import EventBus from './components/EventBus';

export default {
  name: 'App',
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

<style lang="scss">
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
