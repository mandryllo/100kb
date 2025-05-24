export default defineEventHandler(() => {
  return useStorage().getItem('feed:list');
});
