<template>
  <div class="subject-main-div">
    <table>
      <tbody>
      <tr v-for="(subjectIPage, index) in chunks" :key="index">
        <td v-for="subject in subjectIPage" :key="subject.id" @click="goToDetail(subject.idStr)">
          {{ subject.subjectName }}
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading-indicator">
      <n-spin size="large" stroke="red"/>
    </div>
  </div>
</template>

<script setup>
import {fetchSubjectList} from "../api/link";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {NSpin} from "naive-ui";

// 路由
const route = useRoute()
const router = useRouter()
const parentId = route.params.fnSubjectId;
const searchMsg = route.params.searchMsg;
// loading
const loading = ref(false)
// 数据
const items = ref(null)
// 分组（一行2列数据）
const columns = 2
const chunks = ref(null)

fetchData()

//获取Subject列表数据
function fetchData() {
  loading.value = true;
  fetchSubjectList({parentId: parentId, searchMsg: searchMsg}).then((response) => {
    items.value = response.data.records;
    chunks.value = groupItems()
    loading.value = false;
  })
      .catch((error) => {
        console.error(error)
      });
}

//通过路由刷新详情页
function goToDetail(fnSubjectId) {
  //刷新详情
  router.push({
    name: 'Detail',
    params: {fnSubjectId: fnSubjectId},
  });
}

function groupItems() {
  const result = []
  for (let i = 0; i < items.value.length; i += columns) {
    result.push(items.value.slice(i, i + columns))
  }
  return result
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