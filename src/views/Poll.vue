<template>
  <div class="poll">
    <div class="container">
      <ul class="poll-steps step">
        <li class="step-item" :class="stepClass(1)">
          <router-link class="tooltip" data-tooltip="Uređivanje" to="/poll/1">Uređivanje</router-link>
        </li>
        <li class="step-item" :class="stepClass(2)">
          <a class="tooltip" data-tooltip="Pregled">Pregled</a>
        </li>
        <li class="step-item" :class="stepClass(3)">
          <a class="tooltip" data-tooltip="Slanje">Slanje</a>
        </li>
        <li class="step-item" :class="stepClass(4)">
          <router-link class="tooltip" data-tooltip="Rezultati" to="/poll/1/results">Rezultati</router-link>
        </li>
      </ul>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'poll',
  data() {
    return {};
  },
  methods: {
    stepClass(step) {
      const steps = {
        1: this.$route.name === 'PollAddEdit' ? 'active' : '',
        2: this.$route.name === 'PollPreview' ? 'active' : '',
        3: this.$route.name === 'PollSend' ? 'active' : '',
        4: this.$route.name === 'PollResults' ? 'active' : '',
      };
      return steps[step];
    },
  },
};
</script>

<style lang="scss" scoped>
.poll-steps {
  margin: 50px 0;
}
</style>
