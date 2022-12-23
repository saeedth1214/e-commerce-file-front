export default function ({ $axios, $auth, error }) {
  $axios.onError(async (resError) => {
    if (
      resError.response &&
      resError.response.status !== 422 &&
      resError.response.status !== 400 &&
      resError.response.status !== 403
    ) {
      error(resError);
    }
    return Promise.reject(resError);
  });
}
