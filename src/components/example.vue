<template>
  <v-file-input
    v-model="files"
    placeholder="Upload your documents"
    label="File input"
    multiple
    prepend-icon="mdi-paperclip"
    @change="checkFileURL"
  >
    <template v-slot:selection="{ text }">
      <v-chip small label color="primary">
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
</template>

<script>
export default {
  methods: {
    checkFileURL() {
      console.log(this.files);
    },
  },
  name: "ExAmple",
  data: () => ({
    files: [],
  }),
};
</script>

<style>
.uploading-image {
  display: flex;
}
</style>
