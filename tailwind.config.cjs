/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {

      colors:{

        'primary-color': '#486A85',
        'secondary-color': '#1D2226',
        'text-color': '#BCBDBE',
        'button-color': '#3A9BE9'
      }


    },
  },
  plugins: [],
}
