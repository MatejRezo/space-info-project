<template>
  <div class="h-100 w-100 home-container">
    <div class="home-content d-flex flex-column text-center">
      <h1>ABOUT PAGE</h1>
      <div class="py-5">
        <p>
          Hi, my name is Matej and I welcome you to my Space info page. This project is
          made for one of my university classes! On the first page you can see the title
          and the picture of "Astronomy Picture of The Day", chosen my NASA. Below it is
          short description.<br />
        </p>
        <br />
        <p>
          On Weather page you will be able to see average, minimum and maximum
          temperatures in Fahrenheits on the Mars! I used API from NASA official page to
          show these results.<br />
        </p>
        <br />
        <p>
          Gallery is all about our 3 little MARS Rovers. They travel all around the Mars
          and take pictures. Filter by camera type is available. If you are interested to
          see what is it like on Mars, go check them out!<br />
        </p>
        <br />
        <p>
          Last but not least is news page. Showing you all new Space related projects by
          using Spaceflight News API. You can specify what you want to see using search
          bar, as well as add, edit and delete news yourself (university project
          related).<br />
        </p>
      </div>
      <v-card outlined class="px-3 py-3 w-100">
        <h1><span class="secondary-title">APOD:</span> {{ apodImg.title }}</h1>
        <v-img :lazy-src="apodImg.url" :src="apodImg.url"></v-img>
        <div class="py-5">{{ apodImg.explanation }}</div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

let apodImg = ref({});
axios
  .get(
    "https://api.nasa.gov/planetary/apod?api_key=tSRKbOTO2B2NRgWj9ulI2DXXROV2rmUulL3ZgaMx"
  )
  .then((resp) => {
    apodImg.value = resp.data;
  });
</script>

<style scoped lang="scss">
.home-container {
  background-image: url("../assets/nasa-Q1p7bh3SHj8-unsplash.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  max-height: 100%;
  height: calc(100vh - 64px) !important;
  overflow-y: auto;
  overflow-x: hidden;

  .home-content {
    max-width: 800px;
    min-width: 400px;
    padding: 50px 0;
    margin: auto;
  }
  .v-card {
    margin: 30px 0;
    h1 {
      padding-bottom: 15px;
    }
  }
  .secondary-title {
    color: $secondary-text-color;
  }
}
</style>
