import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        highlight: 'var(--highlight)',
        weapon: colors.amber[500],
        vitality: colors.lime[500],
        spirit: colors.violet[500],
        'tag-other': colors.slate[400],
        'tag-negtive-effect': colors.red[600],
        'tag-apply-to-enemy': colors.cyan[400],
      },
      lineHeight: {
        12: '3rem',
      },
    },
  },
  plugins: [],
};
export default config;
