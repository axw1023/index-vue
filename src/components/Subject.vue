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
    <div v-if="loading" class="loading-indicator">
      <n-spin size="large" stroke="red"/>
    </div>
  </div>
</template>

<script setup>
import {fetchSubjectList} from "../api/link";
import {ref, toRef, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {NSpin} from "naive-ui";

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const items = ref(null)
const chunks = ref(null)
//一行2列数据
const columns = 2
//查询
const props = defineProps(['searchMsg'])

fetchData(null, null)

//获取Subject列表数据
function fetchData(parentId, searchMsg) {
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

//通过路由获取Link列表数据
function goToDetail(subject) {
  //刷新分组
  fetchData(subject.idStr);
  //刷新详情
  router.push({
    name: 'Link',
    params: {fnSubjectId: subject.idStr},
  });
}

function groupItems() {
  const result = []
  for (let i = 0; i < items.value.length; i += columns) {
    result.push(items.value.slice(i, i + columns))
  }
  return result
}

/*返回首页，组件监控不到变化，不会重新渲染，需要监控*/
watch(
    () => route.path,
    (path, prePath) => {
      /*避免重复调用*/
      if (path == '/' && prePath != null) {
        fetchData()
      }
    }
)
/*查询*/
watch(() => props.searchMsg, () => {
  /*返回首页*/
  if (props.searchMsg == null || props.searchMsg == "") {
    router.push('/')
  } else {
    /*查询分组*/
    fetchData(null, props.searchMsg)
    /*查询详情*/
    router.push({
      name: 'Search',
      params: {searchMsg: props.searchMsg},
    });
  }
})
</script>

<style scoped>
.subject-main-div {
  overflow: auto;
}

.subject-main-div td {
  padding: 5px; /* 调整单元格的水平边距 */
}

</style>