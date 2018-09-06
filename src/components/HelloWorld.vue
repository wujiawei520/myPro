<template>
    <div class="hello">
        <el-button type="success" @click="handleData">请求数据</el-button>
    </div>
</template>

<script>
import commonSvc from "../../src/services/base/common";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    async handleData() {
      await commonSvc.getSomeData();
    }
  }
};
</script>
