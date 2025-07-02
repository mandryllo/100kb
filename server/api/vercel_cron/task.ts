export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (getHeader(event, 'authorization') !== `Bearer ${config.cronSecret}`) {
    throw createError({ statusCode: 401 });
  }
  const { result } = await runTask('feed');
  return { success: true, result };
});
