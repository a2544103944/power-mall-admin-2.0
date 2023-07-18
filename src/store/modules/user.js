import {defineStore} from 'pinia';
import {login, logout} from "@/api/auth";
import {getUserInfo} from "@/api/sys/user";

const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        nickname: '',
        avatar: '',
        roles: [],
        perms: [],
    }),
    actions: {
        // 登录
        login(loginForm) {
            return new Promise((resolve, reject) => {
                login(loginForm)
                    .then((response) => {
                        const {token} = response.data;
                        localStorage.setItem('token',token);
                        this.token = token;
                        resolve(token);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        // 获取用户信息（昵称、头像、角色集合、权限集合）
        getUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(({data}) => {
                        if (!data) {
                            return reject('Verification failed, please Login again.');
                        }
                        const {nickname, avatar, roles, perms} = data;
                        if (!roles || roles.length <= 0) {
                            reject('getUserInfo: roles must be a non-null array!');
                        }
                        this.nickname = nickname;
                        this.avatar = avatar;
                        this.roles = roles;
                        this.perms = perms;
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        // 注销
        logout() {
            return new Promise((resolve, reject) => {
                logout()
                    .then(() => {
                        localStorage.removeItem('token')
                        this.$reset();
                        resolve(null);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    },
});
export default useUserStore;
