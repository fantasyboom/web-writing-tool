{import('tailwindcss').Config} 
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'times-new-roman': ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}