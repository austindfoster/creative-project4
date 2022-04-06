<template>
  <div class="home">
    <Description :pageDesc="pageDesc" />
    <ImageGallery :items="items" />
  </div>
</template>

<script>
import axios from "axios";
import Description from "../components/Description.vue";
import ImageGallery from '../components/ImageGallery.vue'
export default {
  name: "CS",
  components: {
    Description,
    ImageGallery,
  },
  data() {
    return {
      pageDesc: {},
      items: [],
    };
  },
  created() {
    this.getItems();
    this.getDesc();
  },
  methods: {
    async getDesc() {
      try {
        let response = await axios.get("/api/descriptions");
        this.pageDesc = response.data[1];
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data.filter(item => item.type === 'programming');
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>