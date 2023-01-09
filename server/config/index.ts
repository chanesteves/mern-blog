export default function getConfig(): any {
  const config = require(`./${process.env.NODE_ENV}.config`).default;
  return config;
}
