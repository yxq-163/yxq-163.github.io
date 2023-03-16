<template>
  <div class="userManage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      >
      <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期"  prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manager-header" style="padding-bottom: 20px">
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>

      <el-form ref="formSearch" :model="formSearch" :inline="true">
        <el-form-item>
          <el-input v-model="formSearch.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-form">
      <el-table
        :data="tableData"
        height="90%"
        border
        style="width: 100%"
        >
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
          <template slot-scope="scope">
            <span> {{scope.row.sex == 1 ? "男" : "女"}} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="this.pageData.limit"
          @current-change="handleChange">
        </el-pagination>
      </div>
    </div> 
  </div>
</template>

<script>

import { getUserList, deleteUser, createUser, updateUser } from '../api/index'
export default {
  data() {
      return {
        dialogVisible: false,
        form: {
          name: "",
          age: "",
          sex: "",
          birthday: "",
          address: "",
        },
        rules:  {
          name: [
            {
              required: true, message: '请输入姓名', trigger: 'blur'
            }
          ],
          age: [
            {
              required: true, message: '请输入年龄', trigger: 'blur'
            }
          ],
          sex: [
            {
              required: true, message: '请输入性别', trigger: 'blur'
            }
          ],
          birthday: [
            {
              required: true, message: '请输入生日', trigger: 'blur'
            }
          ],
          address: [
            {
              required: true, message: '请输入地址', trigger: 'blur'
            }
          ],
        },
        tableData: [],
        modalType: 0,    //0 新增 1 编辑
        total: 0,
        pageData: {
          page: 1,
          limit: 20,
        },
        formSearch: {
          name: ""
        }
      };
    },
    methods: {
      submit() {
        this.$refs.form.validate((valid) => {
          if(valid)
            if( this.modalType === 0)
            {
              createUser(this.form).then(() =>{
                this.getList()
              })
            }
            else 
            {
              updateUser(this.form).then(() =>{
                this.getList()
              })
            }
            this.handleClose() 
        })
      },
      handleClose() {
        console.log(this.$refs.form,'111')
        this.$refs.form.resetFields()
        this.dialogVisible = false
      },
      cancel() {
        this.handleClose() 
      },
      handleEdit(index, row) {
        this.modalType = 1
        this.dialogVisible = true
        this.form = JSON.parse(JSON.stringify(row))
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {         
          deleteUser({id:row.id}).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.getList()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });        
      },
      getList() {
        getUserList({ params: {...this.pageData, ...this.formSearch} }).then(({data}) => {
        console.log(data)
        this.tableData = data.list
        this.total = data.count
      })},
      handleAdd() {
        this.modalType = 0
        this.dialogVisible = true
      },
      handleChange(val) {
        this.pageData.page = val
        this.getList()
      },
      onSubmit(){
        this.getList()
      }
    },
    mounted () {
        this.getList()
      },
    
}
</script>

<style lang="less" scoped>
  .userManage {
    height: 90%;
    .manager-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/.el-form-item {
        margin-bottom: 0px;
      }
    }
    .table-form {
      position:  relative;
      height: calc(100% - 62px);
      .block {
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }

</style>