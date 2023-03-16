<template>
    <div class="tabs">
        <el-tag
            v-for="tag in breadList"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="tag.name === $route.meta.name ? 'dark' : 'plain'"
            @close="closeTag(tag)"   
            @click="clickTag(tag)"    
            size="small"     
            >
            {{tag.label}}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
      return {

      };
    },
    computed: {
            ...mapState({
            breadList: state => state.tab.menuList,
        })
    },
    methods: {
        closeTag(item) {
            this.$store.commit('deleteMenu',item);
            var tempItem =  this.$store.state.tab.menuList.slice(-1)
            // console.log(item.name, 'itemname')
            // console.log(this.$route.name,'routename')
            if (item.name !== this.$route.meta.name) {
                return
            }
            this.$router.push(tempItem[0].path)
        },
        clickTag(item) {
            this.$router.push(item.path)
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
    .tabs {
        padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }

</style>