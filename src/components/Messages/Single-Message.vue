<template>
  <section class="feedss">
    <article class="feed">
      <section class="feeds-user-avatar">
        <Avatar
          :fullname="message.user.name"
          radius="15"
          size="30"
          color="#AD1457"
        ></Avatar>
        <span
          v-if="currentUser.email === this.message.user.email"
          class="feeds-user-active"
        ></span>
      </section>
      <section class="feed-content">
        <section class="feed-user-info">
          <h4 class="feed-user-name" @click="showDetails()">
            {{ this.message.user.name }}
            <span class="time-stamp">{{ message.timestamp }}</span>
          </h4>
        </section>

        <div>
          <p v-if="!isFile(message)" class="feed-text">
            {{ message.content }}
          </p>
          <img
            v-else-if="isImage(message)"
            class="feed-image"
            :src="message.image"
          />
          <iframe
            title="Inline Frame Example"
            :src="message.image"
            height="300"
            width="600"
            allowfullscreen
            loading
            v-else
          ></iframe>
          <!-- <a class="feed-pdf-file" v-else :href="message.image">PDF</a> -->
        </div>
      </section>
    </article>
    <!-- The message editing  -->
  </section>
</template>

<script>
import Avatar from "vue-avatar-component";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // url: "",
    };
  },
  props: ["message"],

  name: "Single-Message",

  components: { Avatar },
  computed: mapGetters(["currentUser"]),
  methods: {
    isFile(message) {
      return message.content === undefined && message.image != null;
    },
    isImage(message) {
      if (message.image === undefined) {
        return false;
      }
      //HARDCODED FOR NOW.
      if (
        message.image.toLowerCase().includes("jpeg") ||
        message.image.toLowerCase().includes("JPG") ||
        message.image.toLowerCase().includes("jpg")
      ) {
        return true;
      } else {
        return false;
      }
    },
    getPhotoURL() {
      this.url = this.currentUser.photoURL;
      return this.url;
    },
    showDetails() {
      const { user } = this.message;
      this.$emit("showDetails", user);
    },
  },
};
</script>

<style>
.feedss {
  grid-area: main;
  overflow: auto;
}

.feed {
  display: flex;
  padding: 0.7rem;
  padding-bottom: 0;
  margin-left: 1rem;
  margin-right: 2rem;
}

.feed-content {
  text-align: left;
}
.feeds-user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
  position: relative;
}
.feeds-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.325rem;
}

.feeds-user-avatar span {
  width: 2px;
  height: 2rem;
  border-radius: 0.275rem;
  padding: 1px;
  box-shadow: 0 0 0 0.1rem hsl(0, 0%, 100%);
  display: flex;

  background-color: yellowgreen;
  position: absolute;
  bottom: 8px;
  margin-right: 5px;
  margin-left: 5px;
  right: -0.5rem;
}
.feeds-user-info {
  display: flex;
  margin: 1.5rem 0;
}
.feed-user-info h4 {
  font-size: 1rem;
  margin-right: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: -4px;
}

.feed-user-info h4 .time-stamp {
  font-size: 0.6rem;
  font-weight: 400;
  text-transform: uppercase;
}
.feed-user-info h4 .tag {
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
  font-size: 0.7rem;
  border-radius: 0.2rem;
  background-color: var(#f8f8f8);
  color: var(rgba(134, 134, 134, 1));
  line-height: 2.6;
  margin-right: 0.5rem;
}
.feed-text {
  font-size: 1rem;
  text-align: justify;
}

.feed-image {
  height: 300px;
  width: 250px;
}
</style>
