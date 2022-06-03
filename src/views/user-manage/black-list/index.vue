<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="dialogVisible = true">新增映射国家</el-button>
      </div>
    </el-card>
    <el-card class="body">
      <div>
        <el-table :data="tableDataArr" style="width: 100%" border>
          <el-table-column prop="postCodePrefix" label="邮编前三位" />
          <el-table-column prop="countryCode" label="映射国家代码" />
          <el-table-column prop="countryCnName" label="映射国家中文" />
          <el-table-column prop="countryEnName" label="映射国家英文" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-popconfirm
                title="确定删除吗?"
                confirm-button-text="是"
                cancel-button-text="否"
                @confirm="confirmEvent(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button type="danger" plain size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" title="新增映射国家" width="30%" draggable>
      <el-form :model="dialogForm">
        <el-form-item label="邮编前三">
          <el-input v-model="dialogForm.postCodePrefix" autocomplete="off" />
        </el-form-item>
        <el-form-item label="映射国家">
          <el-select v-model="dialogForm.countryCode" placeholder="请选择一个国家">
            <el-option v-for="item in listCountryArr" :key="item.code" :value="item.code" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="dialogHandle(dialogForm)">新增</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 这里可以导入其他文件
import { ref, reactive } from 'vue';
import { listCountry, searchCountry, deleteCountry, updateCountry } from '@/api/map';
//数据相关
//弹框表单结构
const dialogForm = reactive({
  postCodePrefix: '',
  countryCode: '',
});
const listCountryArr = ref([]);
const tableDataArr = ref([]); //表格数据
const listCountryResult = async () => {
  const result = await listCountry();
  listCountryArr.value = result;
};
const tableDataResult = async () => {
  const result = await searchCountry();
  tableDataArr.value = result;
};
tableDataResult();
listCountryResult();
const confirmEvent = async (index, row) => {
  let id = row.id;
  let deleteResult = await deleteCountry({ id });
  console.log(deleteResult);
  await tableDataResult();
};
const dialogHandle = async (form) => {
  let result = await updateCountry(form);
  console.log(result);
  dialogVisible.value = false;
  await tableDataResult();
};
const dialogVisible = ref(false);
</script>
<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
}
</style>
