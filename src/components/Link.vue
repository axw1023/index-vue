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
        <n-spin size="large" stroke="red"/>
      </div>
    </div>
    <div class="edit-div">
      <button @click="openAddModal">新增</button>
      <div class="random-div">
        <button @click="randomShow">随机</button>
      </div>
      <div class="noRandom-div">
        <button @click="noRandomShow">不随机</button>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <!-- 表单内容 -->
        <form @submit.prevent="addLink">
          <label>{{ fnSubjectName }}</label>
          <br>
          <label for="linkName">名称</label>
          <input type="text" id="linkName" v-model="newLink.linkName" required>
          <label for="linkUrl">链接</label>
          <input type="text" id="linkUrl" v-model="newLink.linkUrl" required>
          <label for="linkExplain">说明</label>
          <input type="text" id="linkExplain" v-model="newLink.linkExplain">
          <br>
          <button type="submit">保存</button>
          <button @click="closeAddModal">取消</button>
        </form>
      </div>
    </div>
    <!-- 重复点击弹窗-->
    <div>
      <el-dialog :visible="dialogVisible">
        <div>{{ responseContent }}</div>
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
const fnSubjectName = route.query.fnSubjectName;
let items = ref([])
let loading = ref(false)
let showAddModal = ref(false)
let newLink = {
  linkName: '',
  linkUrl: '',
  linkExplain: '',
  fnSubjectId: '',
}
const dialogVisible = false

fetchData()

//获取Link列表数据
function fetchData() {
  loading.value = true;
  fetchLinkList({fnSubjectId: fnSubjectId}).then((response) => {
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
          alert("重复提交");
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
          alert("重复提交");
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

//打开弹窗
function openAddModal() {
  showAddModal.value = true;
}

//关闭弹窗
function closeAddModal() {
  showAddModal.value = false;
}

//新增
function addLink() {
  newLink.fnSubjectId = fnSubjectId;
  addLinkAPI(newLink).then((response) => {
    // 将新项添加到列表中
    items.value = response.data;
    // 清空表单数据
    newLink = {
      linkName: '',
      linkUrl: '',
      linkExplain: '',
      fnSubjectId: '',
    };
    // 关闭弹窗
    closeAddModal();
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

/*新增表单*/
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
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