/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  printWidth: 80,
  plugins: ['prettier-plugin-tailwindcss'],
}
