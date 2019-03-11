<template lang="pug">
  div
    canvas(id='chartGildCounts' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartLabels, chartOptions } from '@/utils/charts';
  import { mapGetters } from 'vuex';
  import { Getters } from '@/store/reddit/@types';

  export default Vue.extend({
    name: 'chart-gild-counts',
    data() {
      return {
        chart: {} as Chart,
      };
    },
    computed: {
      ...mapGetters('reddit', [Getters.GILD_COUNTS]),
    },
    watch: {
      [Getters.GILD_COUNTS](val) {
        this.chart!.data!.datasets![0].data = val.silver;
        this.chart!.data!.datasets![1].data = val.gold;
        this.chart!.data!.datasets![2].data = val.platinum;
        this.chart.update();
      },
    },
    mounted() {
      const myChart = new Chart('chartGildCounts', {
        type: 'line',
        data: {
          labels: chartLabels(),
          datasets: [
            {
              label: '# of silver',
              data: [],
              backgroundColor: 'rgba(155, 155, 155, 0.2)',
              borderColor: 'rgba(155, 155, 155, 1)',
              borderWidth: 1,
            },
            {
              label: '# of gold',
              data: [],
              backgroundColor: 'rgba(247, 228, 56, 0.2)',
              borderColor: 'rgba(247, 228, 56, 1)',
              borderWidth: 1,
            },
            {
              label: '# of platinum',
              data: [],
              backgroundColor: 'rgba(0, 188, 248, 0.2)',
              borderColor: 'rgba(0, 188, 248, 1)',
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
