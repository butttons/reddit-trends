<template lang="pug">
  .w-100.w-50-l
    canvas(id='chartGildCounts' width='600' height='400')
</template>
<script lang="ts">
  import Vue from 'vue';
  import Chart from 'chart.js';
  import { chartConfig } from '@/utils/charts';
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
      this.chart = new Chart(
        'chartGildCounts',
        chartConfig(['Silver', 'Gold', 'Platinum'], true),
      );
    },
  });
</script>
