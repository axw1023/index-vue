<template>
  <div>
    <h1>Demo</h1>
    <div v-if="loading">Loading...</div>
    <ul v-if="!loading">
      <div>
        <table>
          <tbody>
          <tr v-for="(chunk, index) in chunks" :key="index">
            <td v-for="item in chunk" :key="item.id">{{ item.subjectName }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </ul>
  </div>
</template>

<script>
import {fetchLinkList} from '@/api/link.js';

export default {
  name: 'App',
  data() {
    return {
      items: [],
      loading: true,
      //一行5列数据
      columns: 5,
    };
  },
  created() {
    fetchLinkList().then((response) => {
      this.items = response.data.records;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
    });
  },
  computed: {
    //按columns分组，达到换行效果
    chunks() {
      const result = []
      for (let i = 0; i < this.items.length; i += this.columns) {
        result.push(this.items.slice(i, i + this.columns))
      }
      return result
    },
  },
};
</script>