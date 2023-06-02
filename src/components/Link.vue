<template>
  <div class="link-main-div">
    <div class="blank-div"></div>
    <div class="table-div">
      <table>
        <colgroup>
          <col style="background-color: #b0a070;width: 30%">
          <col style="background-color: #1ba6a6;width: 50%">
          <col style="background-color: #a333da;width: 20%">
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
            <button @click="addLikeCount(link)">赞{{ link.likeCount }}</button>
            <!--            <button @click="subtractLikeCount">反</button>-->
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="edit-div">
      <button @click="openAddModal">新增</button>
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
  </div>
</template>

<script>
import {addLikeCount, addLink, fetchLinkList} from "../api/link";

export default {
  name: "Link",
  data() {
    return {
      fnSubjectId: '',
      fnSubjectName: '',
      items: [],
      loading: true,
      showAddModal: false,
      newLink: {
        linkName: '',
        linkUrl: '',
        linkExplain: '',
        fnSubjectId: '',
      },
    };
  },
  created() {
    this.fnSubjectId = this.$route.params.fnSubjectId;
    this.fnSubjectName = this.$route.query.fnSubjectName;
    fetchLinkList({fnSubjectId: this.fnSubjectId}).then((response) => {
      this.items = response.data.records;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
    });
  },
  methods: {
    // 点赞
    addLikeCount(link) {
      addLikeCount(link.id).then((response) => {
        link.likeCount = response.data;
      })
    },
    //弹窗
    openAddModal() {
      this.showAddModal = true;
    },
    closeAddModal() {
      this.showAddModal = false;
    },
    //新增
    addLink() {
      this.newLink.fnSubjectId = this.fnSubjectId;
      addLink(this.newLink).then((response) => {
        // 将新项添加到列表中
        this.items.push(response.data);
        // 清空表单数据
        this.newLink = {
          linkName: '',
          linkUrl: '',
          linkExplain: '',
          fnSubjectId: '',
        };
        // 关闭弹窗
        this.closeAddModal();
      });
    },
  }
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

</style>