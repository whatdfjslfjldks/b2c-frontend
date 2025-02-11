import type { Config } from "tailwindcss";

export default {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        custom: [
          '"PingFang SC"',
          '"Helvetica Neue"',
          'Helvetica',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"微软雅黑"',
          'Arial',
          'sans-serif'
        ],
        custom2:[
          'AlibabaSans102v1TaoBao-Bold',
          'sans-serif'
        ],
        custom3:[
          'PingFangSC-Semibold'
        ],
        custom4:[
         'PingFangSC-Regular'
        ]
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
} satisfies Config;
