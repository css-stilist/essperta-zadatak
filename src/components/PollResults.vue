<template>
  <div class="poll-results" :class="elClass">

    <poll-results-chart v-if="!isLoading" :chartdata="results"></poll-results-chart>

    <table class="table">
      <thead>
        <tr>
          <th>Opcije</th><th>Odgovori</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rawData" :key="row.label">
          <td>{{row.label}}</td>
          <td>{{row.value}}</td>
          <td>{{row.count}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import PollResultsChart from './PollResultsChart.vue';

export default {
  name: 'poll-results',
  components: {
    'poll-results-chart': PollResultsChart,
  },
  data() {
    return {
      isLoading: true,
      rawData: [
        { label: 'Po preporuci', value: 30, count: 9 },
        { label: 'Svidio mi se sadržaj', value: 22, count: 9 },
        { label: 'Želim produbiti znanje o tematici', value: 24, count: 9 },
        { label: 'Po zahtjevu poslodavca', value: 38, count: 9 },
        { label: 'Mislim da će mi pomoći u razvoju karijere', value: 16, count: 9 },
        { label: 'Drugi razlozi', value: 8, count: 9 },
      ],
      results: {
        labels: [
        ],
        datasets: [
          {
            label: 'Rezultati',
            data: [],
          },
        ],
      },
    };
  },
  computed: {
    elClass() {
      return this.isLoading ? 'is-loading' : '';
    },
  },
  mounted() {
    // fake getting data from API (so we can see loading state)
    // and format data for use with chart plugin
    setTimeout(() => {
      this.rawData.forEach((row) => {
        this.results.labels.push(row.label);
        this.results.datasets[0].data.push(row.value);
      });
      this.isLoading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.poll-results {
  min-height: 400px;
  position: relative;

  * {
    opacity: 1;
    transition: all 0.3s;
  }
}

.is-loading {
  * {
    opacity: 0;
  }

  &:before {
    content: "Loading data...";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
  }
}
</style>
