<template lang="pug">
  .w-100.w-50-l
    canvas(id='chartScoreCounts' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartConfig, chartMixin } from '@/utils/charts';
  import { mapGetters } from 'vuex';
  import { Getters } from '@/store/reddit/@types';

  export default Vue.extend({
    name: 'chart-score-counts',
    mixins: [chartMixin],
    data() {
      return {
        chart: {} as Chart,
      };
    },
    computed: {
      ...mapGetters('reddit', [
        Getters.SCORE_TOTAL,
        Getters.SCORE_MEAN,
        Getters.SCORE_MEDIAN,
        Getters.SCORE_RANGE,
      ]),
    },
    watch: {
      [Getters.SCORE_TOTAL](val) {
        this.updateChart(this.chart, 0, val);
      },
      [Getters.SCORE_MEAN](val) {
        this.updateChart(this.chart, 1, val);
      },
      [Getters.SCORE_MEDIAN](val) {
        this.updateChart(this.chart, 2, val);
      },
      [Getters.SCORE_RANGE](val) {
        this.updateChart(this.chart, 3, val);
      },
    },
    mounted() {
      this.chart = new Chart(
        'chartScoreCounts',
        chartConfig(['Score total', 'Score mean', 'Score median', 'Score range']),
      );
    },
  });
</script>
