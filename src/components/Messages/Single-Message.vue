<!-- <template>
  <div>
    <v-sheet class="container">
      <img src="../../assets/avatar2.jpeg" alt="Avatar" />
      <p>{{ message.content }}</p>
      <span class="time-right">{{ message.timestamp }}</span>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["message"],
  name: "Single-component",
  mounted() {
    console.log(this.message);
  },
};
</script>

<style scoped>
body {
  margin: 0 auto;
  max-width: 800px;
  padding: 0 20px;
}

.container {
  border: 2px solid #dedede;
  background-color: white;
  width: 50%;
  height: 80px;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
  height: 60px;
}

.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

.time-right {
  float: right;
  color: #aaa;
}

.time-left {
  float: left;
  color: #999;
}
</style> -->
