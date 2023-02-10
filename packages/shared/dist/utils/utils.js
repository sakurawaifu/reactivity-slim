const isPlainObject = (value) => typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';
export { isPlainObject };
