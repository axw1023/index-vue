<template>
  <div class="link-main-div">
    <div class="blank-div"></div>
    <div class="table-div">
      <table>
        <colgroup>
          <col style="background-color: #b0a070;width: 25%">
          <col style="background-color: #1ba6a6;width: 40%">
          <col style="background-color: #39a61b;width: 20%">
          <col style="background-color: #a333da;width: 15%">
        </colgroup>
        <tbody>
        <tr v-for="(link, index) in items">
          <td>
            {{ link.linkName }}
          </td>
          <td>
            <a :href="link.linkUrl" target="_blank">{{ link.linkUrl }}</a>
          </td>
          <td>
            {{ link.createTime }}
          </td>
          <td>
            <button @click="addLike(link)">👍{{ link.likeCount }}</button>
            <button @click="addDisLike(link)">👎{{ link.dislikeCount }}</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-if="loading" class="loading-indicator">
        <n-spin v-if="loading" size="large" stroke="red"/>
      </div>
    </div>
    <div class="edit-div">
      <div class="random-div">
        <button @click="randomShow">随机</button>
      </div>
      <div class="noRandom-div">
        <button @click="noRandomShow">不随机</button>
      </div>
    </div>
    <!-- 重复点击弹窗-->
    <div>
      <el-dialog :visible="dialogVisible">
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {addLikeCount, addLinkAPI, addDislikeCount, fetchLinkList} from "../api/link";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {NSpin} from 'naive-ui'


const route = useRoute()
const fnSubjectId = route.params.fnSubjectId;
const searchMsg = route.params.searchMsg;
const items = ref([])
const loading = ref(false)
const dialogVisible = false

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

// 点赞
function addLike(link) {
  addLikeCount(link.idStr).then((response) => {
    link.likeCount = response.data;
  })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          //todo 按钮变灰
        }
      });
}

// 点踩
function addDisLike(link) {
  addDislikeCount(link.idStr).then((response) => {
    link.dislikeCount = response.data;
  })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          //todo 按钮变灰
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

.edit-div {
  flex: 0 0 15%;
  /*上方居中*/
  display: flex;
  justify-content: center;
  align-items: start;
//display: none;
}

/*列表*/
table {
  border-collapse: collapse; /*共享单元格*/
  white-space: nowrap; /* 强制在一行显示 */
  /*table各单元格内容固定长度，不溢出*/
  table-layout: fixed;
  width: 100%;
}

td {
  border: 1px solid #ddd;
  padding: 5px;

  text-align: center;
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

</style>