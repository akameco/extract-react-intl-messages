import babel from '@babel/core'

declare module '@babel/core' {
  function resolvePlugin(name: string, dirname: string): string | null
  function resolvePreset(name: string, dirname: string): string | null
}
