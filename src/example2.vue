<template>
  <main class="main">
    <section class="sidebar">
      <div class="sidebar-1">
        <div class="box-1"></div>
        <div class="box-2"></div>
        <div class="box-3">+</div>
      </div>

      <!-- SIDEBAR 2 WITH CHANNELS AND PEOPLE/USERS INFO  -->
      <article class="sidebar-2">
        <section class="sidebar-user">
          <div class="sidebar-user-info">
            <h4>USER NAME</h4>
            <v-icon class="username-icon-arrdown">mdi-arrow-down</v-icon>
          </div>
          <!-- <p class="sidebar-user-info-additional">
                <i class="fas fa-circle"></i>Sharon Robinson
              </p> -->
          <span class="user-edit-icon"
            ><v-icon class="user-edit-icon-actual"
              >mdi-account-edit</v-icon
            ></span
          >
        </section>
        <section class="unread">
          <h4 class="unread-header">
            <span class="unread-icons">
              <i class="fas fa-minus"></i><i class="fas fa-minus fa-sm"></i
              ><i class="fas fa-minus fa-xs"></i>
            </span>
            All unread
          </h4>
          <ul>
            <li>
              <a href="#"><i class="far fa-comment-dots"></i>Threads</a>
            </li>
            <li>
              <a href="#"><i class="fas fa-at"></i>Mentions & reactions</a>
            </li>
            <li>
              <a href="#"><i class="fas fa-arrow-down"></i>Show more</a>
            </li>
          </ul>
        </section>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    checkFileURL() {
      console.log(this.files);
    },
  },
  name: "ExAmple2",
  data: () => ({
    files: [],
  }),
};
</script>

<style>
.uploading-image {
  display: flex;
}
article,
section {
  display: block;
}
.main {
  display: block;
  grid-row: 2 / -1;
  display: grid;
  grid-template-columns: 16.25rem 2fr;
  overflow: hidden;
}
.sidebar {
  border-top: 0.1rem solid lightgray;
  grid-column: 1 / 2;
  height: 100vh;
  background-color: #350d36;
  display: grid;
  grid-template-columns: 4rem minmax(6.25rem, 16.25rem);
}
.sidebar-1 {
  grid-column: 1 / 1;
  border-right: 0.1rem solid lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* first left-sidebar content */
.sidebar-1 .box-1 {
  margin-top: 1rem;
}
.sidebar-1 .box-1,
.sidebar-1 .box-2 {
  height: 2rem;
  width: 2rem;
  margin-bottom: 0.5rem;
  border: 0.125rem solid;
  border-radius: 0.3rem;
}
.sidebar-1 .box-1 {
  background-color: #2eb67d;
}

.sidebar-1 .box-2 {
  background-color: #ecb22e;
}
.sidebar-1 .box-2:hover,
.sidebar-1 .box-1:hover {
  box-shadow: 0 0 0 0.1rem hsl(0, 0%, 100%);
}
.sidebar-1 .box-3 {
  font-size: 1.5rem;
  color: white;
}

/* USER INFO  */
.sidebar-2 {
  grid-column: 2 / -1;
  overflow: auto;
}
.sidebar-user {
  color: white;
  position: relative;
}
.sidebar-user-info {
  display: flex;
  align-items: center;
  margin: 1rem 0 0.1rem 0.5rem;
  font-weight: bold;
}
.sidebar-user-info h4 {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.sidebar-user-info i {
  font-size: 0.5rem;
}
.sidebar-user-info-additional {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: white;
}
.sidebar-user-info-additional i {
  color: green;
  font-size: 0.5rem;
  padding-right: 0.3rem;
}
.user-edit-icon {
  position: absolute;
  top: 0;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.user-edit-icon-actual {
  color: black;
}
.username-icon-arrdown {
  color: white;
}

/* user info ends */
</style>
