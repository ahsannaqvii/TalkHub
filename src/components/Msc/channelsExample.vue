<template>
  <section class="channels">
    <v-menu open-on-hover bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          style="
            margin-top: 6px;
            padding: 0;
            display: flex;
            width: 100%;
            justify-content: flex-start;
          "
          depressed
          color="#350d36"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-arrow-down</v-icon>
          <h4 class="channels-header">{{ Name }}</h4>
        </v-btn>
      </template>

      <v-list class="main-list" dense color="#350d36">
        <v-list-item
          depressed
          color="white"
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title depressed class="list-item-title">
            <v-icon style="color: white">mdi-moon-full</v-icon>
            {{ item.title }}</v-list-item-title
          >
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </section>
</template>

<script>
export default {
  props: {
    Name: String,
  },
  name: "channelsEtc",
  data: () => ({
    items: [
      { title: "Channel 1" },
      { title: "Channel 2" },
      { title: "Channel 3" },
      { title: "Channel 4" },
      { title: "Channel 4" },

      { title: "Channel 4" },
    ],
  }),
};
</script>

<style>
/* CHANNELS CSS  */
.channels {
  margin-top: 12px;
  border-top: 0.1rem solid grey;
  margin-bottom: 176px;
}
.main-list {
  width: 100%;
  height: 174px;
  overflow-y: auto;
}
.list-item-title {
  color: white;
  font-size: 14px;
  display: block;
  text-align: justify;
}
.main-list :hover {
  cursor: pointer;
}
</style>
