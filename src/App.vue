<template lang="pug">
  main
    nav.bg-dark-gray.flex.items-center.justify-between
      div.ff-m.f3.pa3.flex.items-center
        img.logo--icon(src='@/assets/img/reddit-icon.svg')
        span.pl2 Reddit Trends
      a(href='https://github.com/butttons/reddit-trends' target='_blank') 
        img.logo--icon.mr3(src='@/assets/img/github-mark.png')
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
          button.f5.pa3.outline-0.bn.ttu.pointer.white.o-80(type='submit' :disabled='started' :class='buttonStyleSubmit') Start
          button.f5.pa3.outline-0.bn.br2.ttu.br--right.pointer.white.o-80.glow(@click='buttonAction' type='button' :class='buttonStyleClear') {{ buttonLabel }}
        .flex.pb2
          div
            div
              .f6.pb1.silver.mt2.pb1 Limit of posts
              .flex
                a.dn(ref='download')
                input.w4.f5.pa2.outline-0.br2.bn.bg-moon-gray(type='number' placeholder='Max posts' v-model='maxPosts' required)
                button.f5.pv2.ph3.outline-0.bn.br2.ttu.pointer.white.o-80.ml2(type='button' @click='exportAction' :disabled='!totalCount && !started' :class='buttonStyleExport') Export
            div
              .f6.pb1.silver.mt2.pb1 Timezone
              select.w3.bg-moon-gray.outline-0.bn.br2.w-100.pa2(v-model='selectedTimezone')
                option(v-for='tz, index in timezones' :value='tz' :key='index') {{ tz }}
          .w-100.pl2.pt2
            table.table.pa3.ba.b--silver.moon-gray.br2.f6.w-100.h-100
              tr
                td.w-40 Total posts
                td.bg-light-silver.dark-gray.br1.pv1.ph2 {{ totalCount }}
              tr
                td.w-40 Oldest post
                td.bg-light-silver.dark-gray.br1.pv1.ph2 {{ oldestPost }}
      .ph2.flex.flex-column.flex-row-l
        chart-score-counts
        chart-post-count
      .ph2.flex.flex-column.flex-row-l
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
  import { Actions, Getters, RedditState } from '@/store/reddit/@types';
  import { mapGetters, mapActions, mapState, Computed } from 'vuex';
  import { SubredditSorts } from '@/utils/@types-reddit';
  import { ComputedClass } from '*.vue';
  import moment from 'moment-timezone';
  export default Vue.extend({
    name: 'app',
    data() {
      return {
        subreddit: 'videos',
        sortType: 'new',
        maxPosts: 100,
        selectedTimezone: '',
      };
    },
    mounted() {
      // @ts-ignore
      this.clearData();
      this.selectedTimezone = moment.tz.guess();
      this.$store.dispatch('reddit/setTimezone', {
        timezone: this.selectedTimezone,
      });
    },
    watch: {
      selectedTimezone(timezone: string) {
        this.$store.dispatch('reddit/setTimezone', { timezone });
      },
    },
    computed: {
      ...mapState('reddit', ['started']),
      ...mapGetters('reddit', [Getters.TOTAL_COUNT, Getters.OLDEST_POST]),
      timezones(): string[] {
        return moment.tz.names();
      },
      buttonStyleSubmit(): ComputedClass {
        return {
          // @ts-ignore
          'bg-gray moon-gray': this.started,
          // @ts-ignore
          'bg-reddit-color white glow': !this.started,
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
      exportAvailable(): boolean {
        // @ts-ignore
        return this.totalCount > 0 && !this.started;
      },
      buttonStyleExport(): ComputedClass {
        return {
          'bg-gray moon-gray': !this.exportAvailable,
          'bg-green white glow': this.exportAvailable,
        };
      },
      buttonLabel(): string {
        // @ts-ignore
        return this.started ? 'Stop' : 'Clear';
      },
    },
    methods: {
      ...mapActions('reddit', ['clearData', 'setStatus', 'exportData']),
      exportAction() {
        if (this.exportAvailable) {
          const fileName = `export-${this.subreddit}_${this.sortType}.json`;
          const anchor = this.$refs.download as HTMLElement;
          const raw = this.$store.state.reddit.raw;
          const blob = new Blob([JSON.stringify(raw, null, 2)], {
            type: 'application/json',
          });
          const href = URL.createObjectURL(blob);
          anchor.setAttribute('href', href);
          anchor.setAttribute('download', fileName);
          anchor.click();
          URL.revokeObjectURL(anchor.getAttribute('href') as string);
        }
      },
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
        const fetchConfig = {
          subreddit: this.subreddit,
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
