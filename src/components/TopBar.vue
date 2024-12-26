<template>
  <div class="top-bar">
    <div class="blank-div"></div>
    <div class="home-div">
      <router-link to="/">
        <img src="/Home.svg" class="icon"/>
      </router-link>
    </div>
    <div class="edit-div" v-show="searchMsg == null || searchMsg === ''">
      <n-button :bordered="false" size="tiny" @click="openAddModal"><img src="/AddAlt.svg" class="icon"/>Add
      </n-button>
      <!--<div class="random-div">-->
      <!--  <n-button size="tiny" @click="randomShow">随机</n-button>-->
      <!--</div>-->
      <!--<div class="noRandom-div">-->
      <!--  <n-button size="tiny" @click="noRandomShow">不随机</n-button>-->
      <!--</div>-->
    </div>
    <div class="search-div">
      <!--按回车触发-->
      <n-input class="search-input" size="small" round v-model="searchMsg" placeholder="  Search"
             @keyup.enter="goToDetail"/>
    </div>


    <!-- 新增弹窗（模态窗） -->
    <n-modal v-model:show="showAddModal" class="add-modal">
      <div class="add-modal-content">
        <!--表单内容 -->
        <n-form
            ref="formRef" :label-width="80"
            :model="formValue"
            :rules="rules"
        >
          <n-form-item label="Name" path="newLink.linkName">
            <n-input type="text" placeholder="" v-model:value="formValue.newLink.linkName"/>
          </n-form-item>
          <!-- 链接 -->
          <n-form-item label="Url" path="newLink.linkUrl">
            <n-input type="text" placeholder="" v-model:value="formValue.newLink.linkUrl"/>
          </n-form-item>
          <!-- 类型 -->
          <n-form-item label="Type" path="newLink.subjectNameStr">
            <n-input type="text" placeholder="Separate with commas" :allow-input="onlyAllowNumber"
                     v-model:value="formValue.newLink.subjectNameStr"/>
          </n-form-item>
          <!-- 按钮 -->
          <div class="form-actions">
            <n-button @click="addLink">Submit</n-button>
            <n-button @click="closeAddModal">cancel</n-button>
          </div>
        </n-form>
        <!--<n-form-->
        <!--    ref="formRef"-->
        <!--    inline-->
        <!--    :label-width="80"-->
        <!--    :model="formValue"-->
        <!--    :rules="rules"-->
        <!--&gt;-->
        <!--  <n-form-item label="姓名" path="user.name">-->
        <!--    <n-input v-model:value="formValue.name" placeholder="输入姓名" />-->
        <!--  </n-form-item>-->
        <!--</n-form>-->
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {NButton} from "naive-ui";
import {NModal} from "naive-ui";
import {NInput} from "naive-ui";
import {NForm} from "naive-ui";
import {NFormItem} from "naive-ui";
import type {FormInst} from 'naive-ui'
import {addLinkAPI} from "@/api/link";


// 表单
let formRef = ref<FormInst | null>(null)
// 表单实体
let formValue = ref({
  newLink: {
    linkName: '',
    linkUrl: '',
    subjectNameStr: '',
  }
})
// 验证规则（rules和formValue的结构一致，否则无法校验）
let rules = ref({
  newLink: {
    linkName: {
      required: true,
      message: 'Required field',
      trigger: 'blur'
    },
    linkUrl: {
      required: true,
      message: 'Required field',
      trigger: 'blur'
    },
    subjectNameStr: {
      required: true,
      message: 'Required field',
      trigger: 'blur'
    },
  }
})

// 路由
const router = useRouter()
// 查询
const searchMsg = ref(null)

// 通过路由刷新详情页
function goToDetail() {
  // 返回首页
  if (searchMsg.value == null || searchMsg.value == "") {
    router.push('/')
  } else {
    // 刷新详情
    router.push({
      name: 'Search',
      params: {searchMsg: searchMsg.value},
    });
  }
}

// 新增弹窗
let showAddModal = ref(false)

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
  formRef.value?.validate((errors) => {
    if (errors) {
      return;
    }
    const newLink = {
      linkName: formValue.value.newLink.linkName,
      linkUrl: formValue.value.newLink.linkUrl,
      subjectNameStr: formValue.value.newLink.subjectNameStr,
    }
    addLinkAPI(newLink).then((response) => {
      // 清空表单数据
      formValue = ref({
        newLink: {
          linkName: '',
          linkUrl: '',
          subjectNameStr: '',
        }
      });
      // 关闭弹窗
      closeAddModal();
    });
  });
}

//文本校验
function onlyAllowNumber(value) {
  const regex = /^[\w,]+$/; // 只允许字母、数字和逗号
  return regex.test(value.trim());
}

</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: left;
  width: 100%;
  gap: 20px; /* 设置子元素间的水平间距 */
}

.icon {
  width: 24px; /* 图标宽度 */
  height: 24px; /* 图标高度 */
}

.blank-div {
  flex: 0 0 15%;
}

.add-modal-content {
  width: 20%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.form-actions {
  display: flex;
  justify-content: flex-end; /* 将按钮靠右对齐 */
  gap: 10px; /* 按钮间距 */
}

.form-actions button[type="button"] {
  background-color: #f44336;
  color: white;
}
</style>