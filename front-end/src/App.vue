<template>
  <div id="app">
    <nav>
      <router-link to="/" id="home"></router-link>
      <router-link to="/animation" id="art"></router-link>
      <router-link to="/cs" id="cs"></router-link>
      <router-link to="/about" id="about"></router-link>
      <router-link to="/admin" id="admin"></router-link>
    </nav>
    <router-view />
    <br />
    <div class="row">
      <a
        href="https://github.com/austindfoster/creative-project4"
        style="text-decoration: none; color: white"
      >
        <svg
          height="32"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
          class="octicon octicon-mark-github v-align-middle"
        >
          <path
            fill="white"
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        Github
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      navTitles: [
        "Home();",
        "Art();",
        "Programming();",
        "About();",
        "Admin();",
      ],
      navIDs: ["home", "art", "cs", "about", "admin"],
      speed: 60,
    };
  },
  mounted() {
    this.typeLetters(this.navTitles, this.navIDs);
  },
  methods: {
    async typeLetters(txt, id) {
      for (var w = 0; w < txt.length; w++) {
        var word = txt[w];
        var tag = id[w];
        for (var i = 0; i < word.length; i++) {
          document.getElementById(tag).innerHTML += word.charAt(i);
          this.i++;
          await new Promise((s) => setTimeout(s, this.speed));
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-color: #08020f;
}

h1 {
  color: #345fec;
}

h2 {
  color: #304ca8;
}

p {
  color: #294dc4;
  margin: auto;
  max-width: 500px;
}

nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 1%;
  font-family: "Courier New", Courier, monospace;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #294dc4;
}

@media only screen and (min-width: 1024px) {
  nav {
    font-size: larger;
  }
}

@media only screen and (max-width: 1023px) and (min-width: 768px) {
  nav {
    font-size: large;
  }
}

@media only screen and (max-width: 767px) {
  nav {
    font-size: small;
  }
}
</style>
