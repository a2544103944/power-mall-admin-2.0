import useUserStore from './modules/user';

const useStore = () => ({
  userStore: useUserStore()
});

export default useStore;
