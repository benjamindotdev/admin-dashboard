import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primaryBlack: '#1C1C1C',
                primaryWhite: '#ffffff',
                lightGreyStokes: '#E5E7EB',
                darkGreyText: '#9CA3AF'
            },
        },
    },
    plugins: [],
}

export default config
