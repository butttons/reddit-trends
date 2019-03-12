<template lang="pug">
  .w-100.w-50-l
    canvas(id='chartCommentCounts' width='600' height='400')
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
        Getters.COMMENT_TOTAL,
        Getters.COMMENT_MEAN,
        Getters.COMMENT_SCORE_RATIO,
      ]),
    },
    watch: {
      [Getters.COMMENT_TOTAL](val) {
        this.updateChart(this.chart, 0, val);
      },
      [Getters.COMMENT_MEAN](val) {
        this.updateChart(this.chart, 1, val);
      },
      [Getters.COMMENT_SCORE_RATIO](val) {
        this.updateChart(this.chart, 2, val);
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
