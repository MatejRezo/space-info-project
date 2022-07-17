<template>
  <div class="news-contianer">
    <div class="news-header">
      <h1 class="text-center my-5">NEWS</h1>
      <div class="news-search d-flex">
        <v-text-field
          v-model="searchTerm"
          label="Search News"
          variant="solo"
          append-inner-icon="mdi-magnify"
          @keydown.enter="onSearch"
        ></v-text-field>
        <v-btn
          class="mx-5"
          icon="mdi-plus"
          color="gray"
          v-bind="attrs"
          v-on="on"
          @click="selectedItemId = -1; dialog = !dialog"
        ></v-btn>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          :activator="{ on, attrs }"
        >
          <v-card>
            <v-card-title class="text-center">
              <span class="text-h5">Add News Item</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="News Title*"
                      v-model="newNewsItem.title"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="News Summary"
                      v-model="newNewsItem.summary"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false; selectedItemId = -1"> Discard </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="
                  dialog = false;
                  configureModal();
                "
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-card
      class="mx-auto my-5 news-item"
      min-width="400"
      max-width="700"
      outlined
      v-for="newsItem in newsItems"
      :key="newsItem.id"
    >
      <v-list-item three-line class="py-0 px-0">
        <div class="item-img h-100">
          <v-hover v-slot="{ isHovering, props }">
            <v-card v-bind="props">
              <v-img :src="newsItem.imageUrl" class="h-100" />
              <div class="h-100 w-100 photo-overlay" v-if="isHovering">
                <v-btn
                  class="mx-5"
                  color="gray"
                  v-on="on"
                  @click="selectedItemId = newsItem.id; dialog = !dialog"
                  >EDIT
                </v-btn>
                <v-btn
                  class="mx-5"
                  color="gray"
                  v-on="on"
                  @click="deleteNewsItem(newsItem.id)"
                  >DELETE
                </v-btn>
              </div>
            </v-card>
          </v-hover>
        </div>
        <div class="item-text px-5">
          <v-list-item-title class="text-h5 mb-1">{{ newsItem.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ newsItem.summary }}</v-list-item-subtitle>
        </div>
      </v-list-item>
    </v-card>
    <div class="text-center px-5 py-5 w-100 galerry-pagination">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";

const pageSize = 10;
let searchTerm = ref("");
let page = ref(1);
let newsItems = ref([]);
let newNewsItem = ref({
  title: "",
  summary: "",
});
let selectedItemId = ref(-1);
let dialog = ref(false);
const getNews = (search) => {
  axios
    .get(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=${pageSize}&_start=${
        page.value * pageSize
      }${search ? "&title_contains=" + search + "&summary_contains=" + search : ""}`
    )
    .then((res) => {
      newsItems.value = res.data;
    });
};
getNews();

watch(page, () => {
  getNews();
});

const onSearch = () => {
  if (!searchTerm.value.length) {
    getNews();
    return;
  }
  getNews(searchTerm.value);
};

const configureModal = () => {
  if (selectedItemId.value !== -1) {
    onEditItem(selectedItemId.value);
    return;
  }
  selectedItemId.value = -1;
  onAddItem();
};

const onAddItem = () => {
  newsItems.value.unshift(newNewsItem.value);
};

const onEditItem = (editItemId) => {
  Object.assign(
    newsItems.value.filter((item) => item.id === editItemId)[0],
    newNewsItem.value
  );
};

const deleteNewsItem = (newsItemId) => {
    newsItems.value = newsItems.value.filter(item => item.id !== newsItemId);
};
</script>

<style scoped lang="scss">
.news-contianer {
  height: calc(100vh - 64px) !important;
  overflow-y: auto;

  .news-search {
    max-width: 700px;
    margin: auto;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
  }

  .news-item {
    padding: 0 !important;
  }

  .item-img {
    width: 40%;
  }
  .item-text {
    width: 60%;
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
