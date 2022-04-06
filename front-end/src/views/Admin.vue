<template>
  <div class="admin">
    <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <div class="vert">
          <input v-model="title" placeholder="Title" />
          <textarea v-model="description" placeholder="Description" />
          <form>
            <input
              id="programming"
              v-model="type"
              type="radio"
              value="programming"
            />
            <label for="programming">Programming</label>
            <input id="art" v-model="type" type="radio" value="art" />
            <label for="art">Art</label>
          </form>
        </div>
        <p></p>
        <input type="file" name="photo" @change="fileChanged" />
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{ addItem.title }}</h2>
        <img v-if="/images/.test(addItem.path)" :src="addItem.path" />
        <video
          v-else-if="/videos/.test(addItem.path)"
          :src="addItem.path"
          autoplay
          loop
          muted
        />
        <textarea v-model="addItem.description" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectItem(s)"
          >
            {{ s.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <div class="vert">
          <input v-model="findItem.title" />
          <textarea v-model="findItem.description" />
        </div>
        <p></p>
        <img v-if="/images/.test(findItem.path)" :src="findItem.path" />
        <video
          v-else-if="/videos/.test(findItem.path)"
          :src="findItem.path"
          autoplay
          loop
          muted
        />
      </div>
      <div class="actions vert" v-if="findItem">
        <form>
          <input
            id="programming"
            v-model="findItem.type"
            type="radio"
            value="programming"
          />
          <label for="programming">Programming</label>
        </form>
        <form class="left-align">
          <input id="art" v-model="findItem.type" type="radio" value="art" />
          <label for="art">Art</label>
        </form>
      </div>
      <div class="actions vert" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
    <div class="heading">
      <div class="circle">3</div>
      <h2>Edit a Description</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findDesc" placeholder="Search" />
        <div class="suggestions" v-if="descriptionSuggestions.length > 0">
          <div
            class="suggestion"
            v-for="d in descriptionSuggestions"
            :key="d.id"
            @click="selectDesc(d)"
          >
            {{ d.title }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findDesc">
        <div class="vert">
          <input v-model="findDesc.title" />
          <textarea v-model="findDesc.description" />
        </div>
      </div>
      <div class="actions vert" v-if="findDesc">
        <button @click="editDesc(findDesc)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AdminView",
  data() {
    return {
      title: "",
      file: null,
      description: "",
      addItem: null,
      addDesc: null,
      items: [],
      pageDesc: [],
      findTitle: "",
      findItem: null,
      findDesc: null,
      findPageTitle: "",
      type: "",
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.title > b.title);
    },
    descriptionSuggestions() {
      let descriptions = this.pageDesc.filter((desc) =>
        desc.title.toLowerCase().startsWith(this.findPageTitle.toLowerCase())
      );
      return descriptions.sort((a, b) => a.title > b.title);
    },
  },
  created() {
    this.getItems();
    this.getDescriptions();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        console.log(this.file);
        const formData = new FormData();
        var r1;
        if (/^video/.test(this.file.type)) {
          formData.append("video", this.file, this.file.name);
          r1 = await axios.post("/api/videos", formData);
        } else {
          formData.append("photo", this.file, this.file.name);
          r1 = await axios.post("/api/photos", formData);
        }
        let r2 = await axios.post("/api/items", {
          title: this.title,
          description: this.description,
          path: r1.data.path,
          type: this.type,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addDescription() {
      try {
        let r2 = await axios.post("/api/descriptions", {
          title: this.title,
          description: this.description,
          type: this.type,
        });
        this.addDesc = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getDescriptions() {
      try {
        let response = await axios.get("/api/descriptions");
        this.pageDesc = response.data;
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
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    selectDesc(desc) {
      this.findPageTitle = "";
      this.findDesc = desc;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          type: this.findItem.type,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editDesc(desc) {
      try {
        await axios.put("/api/descriptions/" + desc._id, {
          title: this.findDesc.title,
          description: this.findDesc.description,
        });
        this.findDesc = null;
        this.getDescriptions();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
select {
  width: 100%;
}

option {
  text-align: center;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

.vert {
  display: flex;
  flex-direction: column;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img,
video {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}

.left-align {
  display: flex;
  justify-content: left;
}
</style>