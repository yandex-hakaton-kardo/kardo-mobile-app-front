/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
module.exports = {
  schemaFile: '../openapi.json',
  apiFile: '../src/shared/api/api.ts',
  outputFile: '../src/shared/api/__generated__.ts',
  hooks: {
    lazyQueries: true,
    mutations: true,
    queries: true,
  },
  tag: true,
};
