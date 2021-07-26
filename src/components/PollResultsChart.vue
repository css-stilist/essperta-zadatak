<template>
  <div id="poll-results-chart"></div>
</template>
<script>
import ApexCharts from 'apexcharts';

export default {
  name: 'poll-results-chart',
  props: ['chartdata'],
  mounted() {
    const options = {
      series: [{
        data: this.chartdata.datasets[0].data,
      }],
      // colors: ['#ccc'],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          colors: {
            // backgroundBarColors: ['#ff0000', '#0000ff', '#cccccc', '#00ff00'],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: this.chartdata.labels,
      },
    };

    const chart = new ApexCharts(document.querySelector('#poll-results-chart'), options);
    chart.render();
  },
};
</script>

<style>
</style>
