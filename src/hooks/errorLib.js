export function onError(error) {
  let message = error.toString();

  //AuthErrors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }
  alert(message);
}
