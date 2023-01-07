export default function ({ $axios, $auth, error, redirect }) {
  $axios.onError(async (resError) => {
    if (resError.response && resError.response.status === 401) {
      redirect("/authenticate?login");
      return;
    }
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
