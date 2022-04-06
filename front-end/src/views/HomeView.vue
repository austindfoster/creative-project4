<template>
  <div class="home">
    <Description :pageDesc="pageDesc" />
    <br>
    <ThreeBy3 :items="items" />
  </div>
</template>

<script>
import axios from "axios";
import Description from "../components/Description.vue";
import ThreeBy3 from '../components/ThreeBy3.vue';
export default {
  name: "Home",
  components: {
    Description,
    ThreeBy3,
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
        this.pageDesc = response.data[0];
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data.sort((a, b) => a.title > b.title);
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