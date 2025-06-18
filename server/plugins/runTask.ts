export default defineNitroPlugin(async () => {
  await runTask('feed');
});
