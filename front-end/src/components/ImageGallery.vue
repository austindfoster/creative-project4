<template>
  <div>
    <section class="image-gallery">
      <div class="image" v-for="(item, index) in items" :key="item.id">
        <div v-if="index % 2 == 0">
          <div class="row">
            <div class="media-box">
              <img v-if="/images/.test(item.path)" :src="item.path" />
              <video
                v-else-if="/videos/.test(item.path)"
                :src="item.path"
                autoplay
                loop
                muted
              />
            </div>
            <div class="col">
              <div class="row">
                <h2>{{ item.title }}</h2>
              </div>
              <div class="row">
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="inverse-row">
            <div class="media-box">
              <img v-if="/images/.test(item.path)" :src="item.path" />
              <video
                v-else-if="/videos/.test(item.path)"
                :src="item.path"
                autoplay
                loop
                muted
              />
            </div>
            <div class="col">
              <div class="inverse-row">
                <h2>{{ item.title }}</h2>
              </div>
              <div class="inverse-row">
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "ImageGallery",
  props: {
    items: Array,
  },
};
</script>

<style scoped>
.image h2,
p {
  font-style: italic;
  text-align: left;
  text-indent: 40px;
}

.image img,
video {
  border-radius: 25px;
}

.image {
  margin: 0 0 5em;
  display: inline-block;
  width: 96%;
  /* background-color: #222; */
  border-radius: 75px;
}

.media-box {
  padding: 2%;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (min-width: 1024px) {
  .row {
    display: flex;
    flex-direction: row;
    margin-left: 3em;
    text-align: center;
  }

  .inverse-row {
    display: flex;
    flex-direction: row-reverse;
    text-align: center;
    margin-right: 3em;
  }

  .image img,
  video {
    max-height: 300px;
  }
}

@media only screen and (max-width: 1023px) and (min-width: 768px) {
  h2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }

  .image img,
  video {
    width: 75%;
  }
}

@media only screen and (max-width: 767px) {
  h2 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }

  .image img,
  video {
    width: 75%;
  }
}
</style>