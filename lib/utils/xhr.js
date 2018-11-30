import superagent from 'superagent'; // Post files

export const PostFiles = (url, files) => {
  if (!url) {
    throw new TypeError('You must provide a url to PostFiles to');
  }

  const promise = superagent.post(url);
  files.forEach(file => {
    promise.attach(file.name, file);
  });
  const auth = localStorage.getItem('access_token');

  if (auth) {
    promise.set('Authorization', 'Bearer ' + auth);
  }

  return promise;
};
const defaultOptions = {
  type: 'form',
  method: 'get',
  headers: {} // Promise XHR wrapper
  // TODO will need to add more parameters to this at some point, cors, auth, other headers, etc

};
export const Xhr = (url, data, options = defaultOptions) => {
  if (!url) {
    throw new TypeError('You must provide a url');
  }

  const method = options.method.toLowerCase();

  if (!method) {
    throw new TypeError('You must provide a method');
  }

  if (!superagent[method]) {
    throw new TypeError(`${method} is not a supported method`);
  }

  let promise = superagent[method](url).accept('*');

  if (options.headers) {
    promise.set(options.headers);
  }

  if (method !== 'get') {
    promise.type(options.type).send(data);
  }

  const auth = localStorage.getItem('access_token');

  if (auth) {
    promise.set('Authorization', 'Bearer ' + auth);
  }

  return promise;
};
export default {
  Xhr: Xhr,
  PostFiles: PostFiles
};