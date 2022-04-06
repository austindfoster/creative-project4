<template>
  <div>
    <div class="row">
      <div class="grid-container">
        <div class="image" v-for="(item, index) in items" :key="item.id">
          <div class="cropped">
            <div v-if="index != 4 && index < 9">
              <img v-if="/images/.test(item.path)" :src="item.path" />
              <video
                v-else-if="/videos/.test(item.path)"
                :src="item.path"
                autoplay
                loop
                muted
              />
            </div>
            <div v-else-if="index < 9">
              <img src="../assets/profile-picture.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThreeBy3",
  props: {
    items: Array,
  },
};
</script>

<style scoped>
.image {
  width: 100%;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  margin: auto;
  border-radius: 2%;
  border-style: ridge;
  border-color: #294dc4;
  overflow: hidden;
}

.cropped {
  overflow: hidden;
}

.cropped img {
  margin: 0px -80px;
}

.row {
  display: flex;
  flex-direction: row;
}

@media only screen and (min-width: 800px) {
  .image img,
  video {
    max-height: 150px;
  }

  .grid-container {
    height: 450px;
  }

  .cropped {
    width: 150px;
  }
}

@media only screen and (max-width: 800px) and (min-width: 600px) {
  .image img,
  video {
    max-height: 100px;
  }

  .grid-container {
    height: 300px;
  }

  .cropped {
    width: 100px;
  }
}

@media only screen and (max-width: 600px) {
  .image img,
  video {
    max-height: 100px;
  }

  .grid-container {
    height: 300px;
  }

  .cropped {
    width: 100px;
  }
}
</style>