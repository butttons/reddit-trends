<template lang="pug">
  div
    canvas(id='chartScoreCounts' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartLabels, chartOptions } from '@/utils/charts';
  import { mapGetters } from 'vuex';
  import { Getters } from '@/store/reddit/@types';

  export default Vue.extend({
    name: 'chart-score-counts',
    data() {
      return {
        chart: {} as Chart,
      };
    },
    computed: {
      ...mapGetters('reddit', [Getters.SCORE_TOTAL, Getters.SCORE_MEAN, Getters.SCORE_MEDIAN]),
    },
    watch: {
      [Getters.SCORE_TOTAL](val) {
        this.chart!.data!.datasets![0].data = val;
        this.chart.update();
      },
      [Getters.SCORE_MEAN](val) {
        this.chart!.data!.datasets![1].data = val;
        this.chart.update();
      },
      [Getters.SCORE_MEDIAN](val) {
        this.chart!.data!.datasets![2].data = val;
        this.chart.update();
      },
    },
    mounted() {
      const myChart = new Chart('chartScoreCounts', {
        type: 'line',
        data: {
          labels: chartLabels(),
          datasets: [
            {
              label: 'Score total',
              data: [],
              backgroundColor: 'rgba(66, 196, 187, 0.2)',
              borderColor: 'rgba(66, 196, 187, 1)',
              borderWidth: 1,
            },
            {
              label: 'Score mean',
              data: [],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Score median',
              data: [],
              backgroundColor: 'rgba(234, 131, 63, 0.2)',
              borderColor: 'rgba(234, 131, 63, 1)',
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
