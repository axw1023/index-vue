<template>
  <div class="subject-main-div">
    <table>
      <tbody>
      <tr v-for="(subjectIPage, index) in chunks" :key="index">
        <td v-for="subject in subjectIPage" :key="subject.id" @click="goToDetail(subject.id)">
          {{ subject.subjectName }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {fetchSubjectList} from "../api/link";

export default {
  name: "Subject",
  data() {
    return {
      items: [],
      loading: true,
      introduction: true,
      //一行2列数据
      columns: 2,
    };
  },
  created() {
    fetchSubjectList().then((response) => {
      this.items = response.data.records;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
    });
  },
  methods: {
    goToDetail(fnSubjectId) {
      this.introduction = false;
      this.$router.push({name: "Link", params: {fnSubjectId: fnSubjectId}});
    }
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
}
</script>

<style scoped>
.subject-main-div {
  overflow: auto;
}
</style>