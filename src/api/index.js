import request from '../utils/request';
// 用户管理
let url = 'http://127.0.0.1:3000'
export const getUserList = (query) => {
    return request({
        url: url + '/user',
        method: 'get'
    });
};
export const addUser = (query) => {
    console.log(query,'data')
    var data = query
    return request({
        url: url + '/user',
        method: 'post',
        data: data
    });
};
export const deleteUser = (query) => {
    return request({
        url: url + '/user/' + query,
        method: 'delete',
    });
};
export const updateUser = (query) => {
    return request({
        url: url + '/user',
        method: 'put'
    });
};

// 歌手管理
export const getSingerList = (query) => {
    return request({
        url: './table.json',
        method: 'get'
    });
};


// 专辑管理
export const getAblumList = (query) => {
    return request({
        url: './table.json',
        method: 'get'
    });
};