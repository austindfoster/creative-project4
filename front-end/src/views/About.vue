<template>
  <div>
    <br />
    <div class="about">
      <div class="profile">
        <img src="../assets/profile-picture.jpg" alt="Profile Pic" />
      </div>
      <div class="description">
        <h1>About Me</h1>
        <p>
          Hi, my name is Austin Foster. I am a full-time student at Brigham
          Young University studying Computer Science with an emphasis in
          Software Engineering. I will graduate April 2023. I have a wide range
          of skills including native android app development, web development,
          algorithm design, graphical manipulation, artificial intelligence,
          scripting, testing, and database management. I have about 4 years of
          Java experience, 5 years of C and C++ experience, and 3 years
          experience with Python.
        </p>
        <br />
        <p>
          My current emphasis is in Software Engineering, but I also have a
          strong passion for animation and gaming. Most of my skills in
          animation and game design are self taught, but I have taken a few
          couses from BYU's Animation department including CSANM 458 on VFX, and
          CSANM 354 on creating realistic shaders. The 3D software I use most
          are Blender, Maya, and Houdini. I am also quite familiar with many of
          the commonly used Adobe products such as Photoshop, Illustrator,
          Premiere, and Substance Painter.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
}

.profile {
  max-width: 300px;
}

img {
  width: 100%;
  border-radius: 50%;
  border-style: groove;
  border-color: #294dc4;
}

h1 {
  text-align: center;
}

p {
  text-align: left;
  text-indent: 40px;
  line-height: 2em;
  padding-left: 5em;
}

@media only screen and (max-width: 1023px) and (min-width: 750px) {
  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile {
    margin: auto;
  }

  p {
    width: 100em;
    padding-left: 0em;
  }
}

@media only screen and (max-width: 750px) {
  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile {
    margin: auto;
  }

  p {
    width: 20em;
    padding-left: 0em;
  }
}
</style>