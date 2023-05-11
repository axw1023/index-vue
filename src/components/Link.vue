<template>
  <div class="link-main-div">
    <table>
      <colgroup>
        <col span="1" style="background-color: #b0a070;width: 20%">
        <col span="2" style="background-color: #1ba6a6;width: 80%">
      </colgroup>
      <tbody>
      <tr v-for="(link, index) in items">
        <td>
          {{ link.linkName }}
        </td>
        <td>
          <a :href="link.linkUrl" target="_blank">{{ link.linkUrl }}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {fetchLinkList} from "../api/link";

export default {
  name: "Link",
  data() {
    return {
      items: [],
      loading: true,
    };
  },
  created() {
    const fnSubjectId = this.$route.params.fnSubjectId;
    fetchLinkList({fnSubjectId: fnSubjectId}).then((response) => {
      this.items = response.data.records;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
    });
  },
}
</script>

<style scoped>
.link-main-div {
  overflow: auto;
  width: 70%; /* 控制div内部，表格宽度 */
}

table {
  border-collapse: collapse;
  white-space: nowrap; /* 强制在一行显示 */
  margin: 0;
  padding: 0;
}

tr {
  width: 100%;
}

td {
  border: 1px solid #ddd;
  padding: 5px;
}

</style>