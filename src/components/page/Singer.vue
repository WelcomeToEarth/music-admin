<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 歌手管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" @click="addNew">新增歌手</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="_id" label="ID" width="250" align="center"></el-table-column>
                <el-table-column prop="name" label="歌手"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="introduce" label="简介"></el-table-column>
                <el-table-column prop="songs" label="歌单" >
                    <template slot-scope="scope">
                        <el-tag 
                            v-for="(o, i) of scope.row.songs"
                        >{{o}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 新增用户弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="user" :model="user" label-width="70px">
                <el-form-item label="姓名">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="user.age"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="user.introduce"></el-input>
                </el-form-item>
                <el-form-item label="歌曲">
                    <el-input v-model="user.songs" placeholder="多个歌曲以逗号分割"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="form.introduce"></el-input>
                </el-form-item>
                <el-form-item label="歌曲">
                    <el-input v-model="form.songs"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false;this.user = {}">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getSingerList,addSinger,deleteSinger,updateSinger } from '../../api/index';
export default {
    name: 'singertable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {}, // 编辑用户表达
            addVisible: false,
            user: {}, // 新增歌手表单
            idx: -1, 
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取用户列表
        getData() {
            getSingerList().then(res=>{
                console.log(res,'res')
                this.tableData = res
            })
        },
        // 添加歌手
        addNew() {
            this.addVisible = true
        },
        saveAdd() {
            var data = {
                name: this.user.name,
                age : this.user.age,
                introduce:this.user.introduce,
                songs: this.user.songs.split(',')
            }
            addSinger(data).then(res=>{
                this.$message.success('新增歌手成功');
                this.addVisible = false
                this.user = {}
                this.getData()
            })
        },
        // 删除用户
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    let id = row._id
                    deleteSinger(id).then(res=>{
                        console.log(res)
                        this.tableData.splice(index, 1);
                    })
                })
                .catch(() => {});
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
