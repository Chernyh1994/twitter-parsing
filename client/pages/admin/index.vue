<template>
  <div>
    <no-ssr>
      <div
        v-masonry
        transition-duration="none"
        item-selector=".item"
        class="masonry-container"
      >
        <div
          v-for="(tweet, index) in tweets"
          :key="index"
          v-masonry-tile
          class="item"
        >
          <v-card class="ma-3 pa-3" color="#26c6da" dark>
            <v-row align="center" justify="end">
              <v-btn
                large
                color="#B71C1C"
                icon
                @click="REMOVE_TWEET(tweet._id)"
              >
                <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </v-row>
            <v-card-title>
              <v-icon large left>
                mdi-twitter
              </v-icon>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">
              "{{ tweet.text }}"
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img class="elevation-6" :src="tweet.profileImages" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ tweet.username }}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-icon>mdi-heart</v-icon>
                  <span class="subheading mr-2">{{ tweet.favoriteCount }}</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1">
                    mdi-share-variant
                  </v-icon>
                  <span class="subheading">{{ tweet.retweetCount }}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import NoSSR from "vue-no-ssr"

export default {
  components: {
    "no-ssr": NoSSR
  },

  computed: {
    ...mapGetters("twitter", { tweets: "TWEET" })
  },

  mounted() {
    this.$store.dispatch("twitter/GET_TWEETS")
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry()
    }
  },

  methods: {
    ...mapActions("twitter", ["REMOVE_TWEET"])
  }
}
</script>

<style scoped>
.item {
  border: none;
  width: 22.5rem;
}
.masonry-container {
  width: 95%;
  margin: 0 auto;
}
</style>
