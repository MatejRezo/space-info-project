<template>
  <div class="gallery-container px-5 py-5">
    <h1 class="text-center py-5 mb-5">
      Mars Rover Photos
      <v-btn @click="drawer = !drawer"
        >Filter<v-icon variant="text" icon="mdi-filter"></v-icon
      ></v-btn>
    </h1>
    <v-row>
      <v-col
        v-for="photo in roverPhotos.photos"
        :key="photo"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card v-bind="props">
            <v-img :lazy-src="photo.img_src" :src="photo.img_src"></v-img>
            <div class="h-100 w-100 photo-overlay" v-if="isHovering">
              {{ photo.camera.full_name }}
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <div class="text-center px-5 py-5 w-100 galerry-pagination">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </div>
  <v-navigation-drawer v-model="drawer" bottom temporary location="right">
    <h2 class="text-center py-5">Filter Options</h2>
    <v-list nav>
      <v-list-item>
        <v-select
          :items="cameraTypes"
          v-model="selectedCamera"
          variant="plain"
          label="Camera type"
        ></v-select>
      </v-list-item>
      <v-list-item class="d-flex justify-space-around">
        <v-btn @click="applyFilter" :disabled="!selectedCamera.length">Apply</v-btn>
        <v-btn @click="resetFilter">Clear</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";

let cameraTypes = ref([
  "FHAZ",
  "RHAZ",
  "MAST",
  "CHEMCAM",
  "MAHLI",
  "MARDI",
  "NAVCAM",
  "PANCAM",
  "MINITES",
]);
let selectedCamera = ref("");
let drawer = ref(false);
let page = ref(1);
let roverPhotos = ref({});

const getImages = (page, camera) => {
  axios
    .get(
      `https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos?sol=1000&page=${page}${
        camera ? "&camera=" + camera : ""
      }`
    )
    .then((res) => {
      roverPhotos.value = res.data;
    });
};

getImages(page.value);

watch(page, async (newPage) => {
  getImages(newPage, selectedCamera.value);
});

const applyFilter = () => {
  getImages(page.value, selectedCamera.value);
  drawer.value = false;
};

const resetFilter = () => {
  selectedCamera.value = "";
  drawer.value = false;
  getImages(page.value);
};
</script>

<style scoped lang="scss">
.gallery-container {
  height: calc(100vh - 64px) !important;
  overflow-y: auto;
  overflow-x: hidden;
  margin: auto;

  .v-row {
    max-width: 1600px;
    margin: auto;
  }

  .photo-overlay {
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
