<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <com-aside/>
            </el-aside>
            <el-container>
                <el-header>
                    <com-header/>
                </el-header>
                <com-tag/>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

import comAside from "../components/comAside.vue"
import comHeader from "../components/comHeader.vue"
import comTag from "../components/comTag.vue"

export default {
    components: {
        comAside,
        comHeader,
        comTag
    }
}
</script>

<style lang="less" scoped>
    .el-header {
        padding: 0 0;
    }
    .el-menu {
        border-right: 0;
    }
</style>