<template>
  <div class="home">
    <img alt="Vue logo"
      src="../assets/logo.png" />
    <p>{{ msg }}</p>
    <p>time diff: {{ time }}</p>
    <!-- <p>dataProp1: {{dataProp1}}</p>
    <p>dataProp2: {{dataProp2}}</p> -->
    <button @click="changeMsg">change Msg</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { ArticleApi } from '@/api/article';
import { UserApi } from '@/api/user';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      dataProp1: 'sdasfs',
      dataProp2: 'sadfd',
    };
  },
  components: {
    HelloWorld,
  },
  setup() {
    ArticleApi.getArticleList({ page: 1, size: 10 }).then((res) => {
      console.log(res);
    });
    UserApi.getUserInfo({ token: 'aaaa' });
  },
});
</script>
