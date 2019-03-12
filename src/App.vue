<template lang="pug">
  main
    nav.bg-dark-gray
      div.ff-m.f3.pa3.flex.items-center
        img.logo--icon(src='@/assets/img/reddit-icon.svg')
        span.pl2 Reddit Trends
    section.ph2
      .pa2.f5.br2.ba.mv2.b--silver.moon-gray Type in a subreddit name and press start
      form(@submit.prevent='startFetch')
        .f6.pb1.silver Subreddit name
        .flex
          .f4.br2.br--left.bg-moon-gray.silver.pa3.ph2 /r/
          input.w-100.f4.pv3.pl2.outline-0.bn.bg-moon-gray(type='text' placeholder='r/' v-model='subreddit' required)
          select.w3.bg-moon-gray.outline-0.bn(v-model='sortType')
            option(value='new') /new
            option(value='hot') /hot
            option(value='top') /top
            option(value='controversial') /controversial
            option(value='rising') /rising  
          button.f5.pa3.outline-0.bn.ttu.pointer.white.o-80.glow(type='submit' :disabled='started' :class='buttonStyleSubmit') Start
          button.f5.pa3.outline-0.bn.br2.ttu.br--right.pointer.white.o-80.glow(@click='buttonAction' type='button' :class='buttonStyleClear') {{ buttonLabel }}
        .f6.pb1.silver.mt2.pb1 Limit of posts
        .flex.pb2
          input.w4.f4.pa3.outline-0.br2.bn.bg-moon-gray(type='number' placeholder='Max posts' v-model='maxPosts' required)
          .ml2.w-100.pa3.ba.b--silver.moon-gray.br2.flex.justify-start
            div
              span.f6.pb1.silver.ma2 Total posts
              span.bg-silver.black-70.br1.f5.pv1.ph2  {{ totalCount }}
            div
              span.f6.pb1.silver.ma2 Oldest post
              span.bg-silver.black-70.br1.f5.pv1.ph2 {{ oldestPost }}
      .ph2.flex.flex-column.flex-row-ns
        chart-score-counts
        chart-post-count
      .ph2.flex.flex-column.flex-row-ns
        chart-comment-counts
        chart-gild-counts
</template>
<script lang="ts">
  import Vue from 'vue';
  import ChartPostCount from '@/components/charts/PostCount.vue';
  import ChartScoreCounts from '@/components/charts/ScoreCounts.vue';
  import ChartGildCounts from '@/components/charts/GildCounts.vue';
  import ChartCommentCounts from '@/components/charts/CommentCounts.vue';
  import { fetchSubReddit, streamPosts } from '@/utils/reddit.ts';
  import { Actions, Getters } from '@/store/reddit/@types';
  import { mapGetters, mapActions, mapState, Computed } from 'vuex';
  import { SubredditSorts } from '@/utils/@types-reddit';
  import { ComputedClass } from '*.vue';
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
      ...mapGetters('reddit', [Getters.TOTAL_COUNT, Getters.OLDEST_POST]),
      buttonStyleSubmit(): ComputedClass {
        return {
          // @ts-ignore
          'bg-gray moon-gray': this.started,
          // @ts-ignore
          'bg-reddit-color white': !this.started,
        };
      },
      buttonStyleClear(): ComputedClass {
        return {
          // @ts-ignore
          'bg-gray moon-gray': !this.started,
          // @ts-ignore
          'bg-reddit-color white': this.started,
        };
      },
      buttonLabel(): string {
        // @ts-ignore
        return this.started ? 'Stop' : 'Clear';
      },
    },
    methods: {
      ...mapActions('reddit', ['clearData', 'setStatus']),
      buttonAction() {
        // @ts-ignore
        const started: boolean = this.started;
        if (started) {
          // @ts-ignore
          this.setStatus({ status: false });
        } else {
          // @ts-ignore
          this.clearData();
        }
      },
      async startFetch() {
        const name = this.subreddit;
        const fetchConfig = {
          subreddit: name,
          type: this.sortType as SubredditSorts,
        };
        // @ts-ignore
        this.setStatus({ status: true });
        await streamPosts(fetchConfig, this.maxPosts);
      },
    },
    components: {
      ChartGildCounts,
      ChartPostCount,
      ChartScoreCounts,
      ChartCommentCounts,
    },
  });
</script>

<style scoped>
  .logo--icon {
    width: 32px;
    height: 32px;
  }
</style>
