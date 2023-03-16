  <template>
    <div class = login>
        <el-form  label-width="70px" :inline="true" :model="form" :rules="rules" ref="form">
            <h3 class="title">系统登录</h3>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" class="login-submit" type="primary" style="margin-left: 105px">登录</el-button>
            </el-form-item>
        </el-form>
    </div> 
  </template>
  
  <script>
  import Cookie from 'js-cookie'
  import Mock from 'mockjs'
  import { getMenu } from '../api/index'
  import vuex from 'vuex'

  export default {
    data() {
        return{
            form: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {required: true,message: "请输入用户名", trigger: "blur"}
                ],
                password: [
                    {required: true,message: "请输入密码", trigger: "blur"}
                ],
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
            if(valid)
            {
                getMenu(this.form).then(({data}) =>{
                    console.log(data)
                    if (data.code === 20000)
                    {
                        console.log(data)
                        const menu = data.data.menu                     
                        const token = data.data.token
                        Cookie.set('token',token)
                        this.$store.commit('addMenu',menu)
                        this.$store.commit('addRouter',this.$router)
                        this.$router.push('home')
                    }
                    else
                    {
                        this.$message.error(data.data.message);
                    }
                })
            }
                
            })

        }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .login {
    width: 350px;
    margin: 180px auto;
    border: 1px solid #eaeaea;
    padding: 35px 35px 15px 15px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
    .el-input  {
        width: 198px;
    }
    .login-submit {
        margin: 10px auto 0px auto
    }



  }
  
  </style>