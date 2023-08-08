/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        dark: '#202124',
      },
      boxShadow: {
        header: '0px -4px 6px 1px white',
        bar: '0px 4px 6px 1px white',
      },
    },
  },
  plugins: [],
};
