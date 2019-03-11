<template lang="pug">
  div
    canvas(id='chartPostCount' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartLabels, chartOptions } from '@/utils/charts';
  import { mapGetters } from 'vuex';
  import { Getters } from '@/store/reddit/@types';

  export default Vue.extend({
    name: 'chart-post-count',
    data() {
      return {
        chart: {} as Chart,
      };
    },
    computed: {
      ...mapGetters('reddit', [Getters.POST_COUNT]),
    },
    watch: {
      [Getters.POST_COUNT](val) {
        this.chart!.data!.datasets![0].data = val;
        this.chart.update();
      },
    },
    mounted() {
      const myChart = new Chart('chartPostCount', {
        type: 'line',
        data: {
          labels: chartLabels(),
          datasets: [
            {
              label: '# of posts',
              data: [],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
            },
          ],
        },
        options: chartOptions,
      });
      this.chart = myChart;
    },
  });
</script>
