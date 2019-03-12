<template lang="pug">
  .w-100.w-50-l
    canvas(id='chartPostCount' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartConfig, chartMixin } from '@/utils/charts';
  import { mapGetters } from 'vuex';
  import { Getters } from '@/store/reddit/@types';

  export default Vue.extend({
    name: 'chart-post-count',
    mixins: [chartMixin],
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
        this.updateChart(this.chart, 0, val);
      },
    },
    mounted() {
      this.chart = new Chart('chartPostCount', chartConfig(['Post count']));
    },
  });
</script>
