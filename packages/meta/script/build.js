import { build } from 'esbuild'

build({
  bundle: true,
  entryPoints: ['./index.ts'],
  charset: 'utf8',
  format: 'esm',
  outdir: './dist',
  drop: ['console'],
  minify: true
})
