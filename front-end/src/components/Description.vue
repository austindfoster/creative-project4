<template>
  <div>
    <h1>{{ pageDesc.title }}</h1>
    <p>{{ pageDesc.description }}</p>
  </div>
</template>

<script>
export default {
  name: "Description",
  props: {
    pageDesc: Object,
  },
};
</script>

<style scoped>
p {
  text-align: center;
  max-width: 800px;
}
</style>