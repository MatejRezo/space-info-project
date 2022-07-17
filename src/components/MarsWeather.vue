<template>
  <div class="mars-weather-container w-100 text-left">
    <div class="info-text">
      <h1>Mars Weather</h1>
      <p>
        NASA’s InSight Mars lander takes continuous weather measurements (temperature,
        wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain
        near Mars’ equator. Please note that there are sometimes problems with the sensors
        on Mars that result in missing data! If you see a long gap, a search result may
        bring up more information on whether it is a long-lasting problem.
      </p>
      <div>
        <h1>
          Today is: <span>{{ currentSolDay }}</span> sol day
        </h1>
      </div>
    </div>
    <h2 class="my-5 mx-5 px-7">Last Sol Week Forcast</h2>
    <div
      class="temperature-data d-flex px-5 mx-3"
      v-if="marsWeatherData.sol_keys?.length"
    >
      <div v-for="solkey in marsWeatherData.sol_keys" :key="solkey">
        <v-card class="px-5 py-5 mx-3" min-width="160">
          <h3>Sol day: {{ solkey }}</h3>
          <hr class="my-3" />
          <p>Avg: {{ marsWeatherData[solkey].AT.av }}</p>
          <p>Min: {{ marsWeatherData[solkey].AT.mn }}</p>
          <p>Max: {{ marsWeatherData[solkey].AT.mx }}</p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed } from "vue";

let marsWeatherData = ref({});
axios
  .get(
    "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"
  )
  .then((resp) => {
    console.log(resp);
    marsWeatherData.value = resp.data;
  });

const currentSolDay = computed(() => {
  return marsWeatherData.value.sol_keys
    ? marsWeatherData.value.sol_keys[marsWeatherData.value.sol_keys.length - 1]
    : "0";
});
</script>

<style scoped lang="scss">
.mars-weather-container {
  height: calc(100vh - 64px) !important;
  background-image: url("../assets/Mars_background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 20px;
  overflow-y: auto;

  .info-text {
    padding: 30px 50px;

    h1 {
      font-size: 3rem;
      padding: 20px 0;
    }
    p {
      max-width: 800px;
    }
  }

  .temperature-data {
    flex-wrap: wrap;
    justify-content: center;
    max-width: fit-content;
    div {
      margin: 7px 0;
      min-width: 170px;
    }
  }
}
</style>
