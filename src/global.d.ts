declare module 'read-babelrc-up' {
  function sync(opts: {
    cwd: string
  }): { path: string; babel: import('@babel/core').TransformOptions }
}
