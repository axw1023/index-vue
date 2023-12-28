<template>
  <div class="subject-main-div">
    <table>
      <tbody>
      <tr v-for="(subjectIPage, index) in chunks" :key="index">
        <td v-for="subject in subjectIPage" :key="subject.id" @click="goToDetail(subject)">
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
  data() {
    return {
      items: [],
      //一行2列数据
      columns: 2,
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    //获取Subject列表数据
    fetchData(parentId) {
      fetchSubjectList({parentId: parentId}).then((response) => {
        this.items = response.data.records;
      })
          .catch((error) => {
            console.error(error);
          });
    },
    //通过路由获取Link列表数据
    goToDetail(subject) {
      //刷新分组
      this.fetchData(subject.idStr);
      //刷新详情
      this.$router.push({
        name: 'Link',
        params: {fnSubjectId: subject.idStr},
        query: {fnSubjectName: subject.subjectName}
      });
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

  watch: {
    /*返回首页，组件监控不到变化，不会重新渲染，需要监控*/
    $route: function () {
      if (this.$route.path == '/') {
        this.fetchData();
      }
    }
  }
}
</script>

<style scoped>
.subject-main-div {
  overflow: auto;
}

.subject-main-div td {
  padding: 5px; /* 调整单元格的水平边距 */
}

</style>