let global_debug = 0
global_debug = 1

export const try_call = async fn => {
  console.log('try_call')
  if (global_debug) return { result: await fn() }
  try {
    return { result: await fn() }
  } catch (error) {
    return { error }
  }
}
