<template lang="pug">
  main
    nav.bg-dark-gray
      div.ff-m.f3.pa3.flex.items-center
        img.logo--icon(src='@/assets/img/reddit-icon.svg')
        span.pl2 Reddit Trends
    section.ph2
      .pa2.f5.br2.ba.mv2.b--silver.moon-gray Type in a subreddit name and press start
      form(@submit.prevent='startFetch')
        .flex
          .f4.br2.br--left.bg-moon-gray.silver.pa3.ph2 /r/
          input.w-100.f4.pv3.pl2.outline-0.bn.bg-moon-gray(type='text' placeholder='r/' v-model='subreddit' required)
          select.w3.bg-moon-gray.outline-0.bn(v-model='sortType')
            option(value='new') /new
            option(value='hot') /hot
            option(value='top') /top
            option(value='controversial') /controversial
            option(value='rising') /rising  
          button.f5.pa3.outline-0.bn.ttu.pointer.bg-reddit-color.white.o-80.glow(type='submit' :disabled='started') Start
          button.f5.pa3.outline-0.bn.br2.ttu.br--right.pointer.bg-mid-gray.white.o-80.glow(@click='clearData' type='button') Clear
        .flex.pv2
          span.w3.ml2.pa3.ba.br--left.b--silver.moon-gray.br2 Limit
          input.w4.f4.pa3.outline-0.br2.br--right.bn.bg-moon-gray(type='number' placeholder='Max posts' v-model='maxPosts' required)
          span.ml2.w-100.pa3.ba.b--silver.moon-gray.br2
            | Total posts: 
            span.f4 {{ totalCount }}
      .pa2.flex.flex-column-ns
        chart-score-counts
        chart-post-count
        chart-gild-counts
</template>
<script lang="ts">
  import Vue from 'vue';
  import ChartPostCount from '@/components/charts/PostCount.vue';
  import ChartScoreCounts from '@/components/charts/ScoreCounts.vue';
  import ChartGildCounts from '@/components/charts/GildCounts.vue';
  import { fetchSubReddit, SubredditSorts, streamPosts } from '@/utils/reddit.ts';
  import { Actions, Getters } from '@/store/reddit/@types';
  import { mapGetters, mapActions, mapState } from 'vuex';
  export default Vue.extend({
    name: 'app',
    data() {
      return {
        subreddit: 'videos',
        sortType: 'new',
        maxPosts: 100,
      };
    },
    computed: {
      ...mapState('reddit', ['started']),
      ...mapGetters('reddit', [Getters.TOTAL_COUNT]),
    },
    methods: {
      ...mapActions('reddit', ['clearData', 'setStatus']),
      async startFetch() {
        const name = this.subreddit;
        const fetchConfig = { subreddit: name, type: this.sortType as SubredditSorts };
        // @ts-ignore
        this.setStatus({ status: true });
        await streamPosts(fetchConfig, this.maxPosts);
      },
    },
    components: {
      ChartGildCounts,
      ChartPostCount,
      ChartScoreCounts,
    },
  });
</script>

<style scoped>
  .logo--icon {
    width: 32px;
    height: 32px;
  }
</style>
