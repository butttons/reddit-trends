<template lang="pug">
  .w-100.w-50-l
    canvas(id='chartCommentCounts' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import {
    chartLabels,
    chartOptions,
    chartColors,
    chartConfig,
  } from '@/utils/charts';
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
      ...mapGetters('reddit', [
        Getters.COMMENT_TOTAL,
        Getters.COMMENT_MEAN,
        Getters.COMMENT_SCORE_RATIO,
      ]),
    },
    watch: {
      [Getters.COMMENT_TOTAL](val) {
        this.chart!.data!.datasets![0].data = val;
        this.chart.update();
      },
      [Getters.COMMENT_MEAN](val) {
        this.chart!.data!.datasets![1].data = val;
        this.chart.update();
      },
      [Getters.COMMENT_SCORE_RATIO](val) {
        this.chart!.data!.datasets![2].data = val;
        this.chart.update();
      },
    },
    mounted() {
      this.chart = new Chart(
        'chartCommentCounts',
        chartConfig(['Comments total', 'Comments mean', 'Score:comments ratio']),
      );
    },
  });
</script>
