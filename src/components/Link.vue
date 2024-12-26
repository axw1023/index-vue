<template>
  <div class="link-main-div">
    <div class="blank-div"></div>
    <div class="table-div">
      <table>
        <colgroup>
          <col style="background-color: #ffffff;width: 40%">
          <col style="background-color: #ffffff;width: 27%">
          <col style="background-color: #ffffff;width: 20%">
          <col style="background-color: #ffffff;width: 13%">
        </colgroup>
        <tbody>
        <tr v-for="(link) in items">
          <td>
            {{ link.linkName }}
          </td>
          <td>
            <n-button
                color="#26bda4"
                v-for="(subject) in link.subjectList"
                class="subject-tag"
                size="tiny"
                round
                @click="goToDetail(subject.idStr)"
            >
              {{ subject.subjectName }}
            </n-button>
          </td>
          <td>
            <a style="color: black" :href="link.linkUrl" target="_blank" class="styled-link">{{ link.linkUrl }}</a>
          </td>
          <!--<td>-->
          <!--  {{ link.createTime }}-->
          <!--</td>-->
          <td>
            <n-button :bordered="false" :disabled="link.likeIsChecked" size="tiny" @click="addLike(link)"><img src="/FaceSatisfied.svg" class="face-icon"/>{{ link.likeCount }}</n-button>
            <n-button :bordered="false" :disabled="link.dislikeIsChecked" size="tiny" @click="addDisLike(link)"><img src="/FaceDissatisfied.svg" class="face-icon"/>{{
                link.dislikeCount
              }}
            </n-button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="loading" class="loading-indicator">
        <n-spin v-if="loading" size="large" stroke="red"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {addLikeCount, addDislikeCount, fetchLinkList} from "@/api/link";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {NSpin} from 'naive-ui'
import {NButton} from 'naive-ui'


// 路由
const route = useRoute()
const router = useRouter()
const fnSubjectId = route.params.fnSubjectId;
const searchMsg = route.params.searchMsg;
// loading
const loading = ref(false)
// 数据
const items = ref([])

fetchData()

//获取Link列表数据
function fetchData() {
  loading.value = true;
  fetchLinkList({fnSubjectId: fnSubjectId, searchMsg: searchMsg}).then((response) => {
    items.value = response.data.records;
    loading.value = false;
  }).catch((error) => {
    console.error(error);
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

// 点赞
function addLike(link) {
  //置为不可点击
  link.likeIsChecked = true;

  addLikeCount(link.idStr).then((response) => {
    link.likeCount = response.data;
  })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
        }
      });
}

// 点踩
function addDisLike(link) {
  link.dislikeIsChecked = true;

  addDislikeCount(link.idStr).then((response) => {
    link.dislikeCount = response.data;
  })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
        }
      });
}

//随机展示
function randomShow() {
  loading.value = true;
  fetchLinkList({fnSubjectId: fnSubjectId, isRandom: 1}).then((response) => {
    items.value = response.data.records;
    loading.value = false;
  })
      .catch((error) => {
        console.error(error);
      });
}

//不随机展示
function noRandomShow() {
  loading.value = true;
  fetchLinkList({fnSubjectId: fnSubjectId}).then((response) => {
    items.value = response.data.records;
    loading.value = false;
  })
      .catch((error) => {
        console.error(error);
      });
}
</script>

<style scoped>

.link-main-div {
  display: flex; /* 使用flexbox布局 */
  overflow: auto; /*溢出滚动*/
}

.blank-div {
  flex: 0 0 15%;
}

.table-div {
  flex: 0 0 70%; /*父div70%宽度*/
}

/*列表*/
table {
  border-collapse: collapse; /*共享单元格*/
  white-space: nowrap; /* 强制在一行显示 */
  /*table各单元格内容固定长度，不溢出*/
  table-layout: fixed;
  width: 100%;
}


th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
  overflow: hidden; /*溢出文字隐藏*/
  text-overflow: ellipsis; /*溢出文字省略号*/
}

form label {
  display: block;
}

form input {
  margin-bottom: 10px;
}

form button {
  margin-top: 10px;
}

table button {
  margin-left: 10px;
}

.styled-link {
  text-decoration: none; /* 去掉下划线 */
}

.styled-link:hover {
  text-decoration: underline; /* 悬停时添加下划线 */
  color: #0056b3; /* 悬停时颜色变化 */
}

.face-icon {
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
}

</style>