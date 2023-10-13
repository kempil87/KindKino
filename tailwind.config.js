/** @type {import('tailwindcss').Config} */

const colors = {
    primary: 'rgb(102,35,232)',
    dark: 'rgb(22 23 29)',
    border: 'rgb(44 45 53)',
    grey: 'rgb(87,87,91)',
    'card-bg': '#101011',
    'light_dark': '#1e1e25'
}

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors
        },
    },
    plugins: [
        function ({addUtilities, theme, addVariant}) {
            const spacing = theme('width');

            const sizeUtility = Object.entries(spacing).reduce(
                (acc, [key, value]) => {
                    acc[`.size-${key.replace(/[./]/g, '\\$&')}`] = {
                        width: value,
                        height: value,
                    };
                    return acc;
                },
                {},
            );

            addVariant('children', '& > *');
            addVariant('children-after', '& > *:after');

            addUtilities({
                ...sizeUtility,
                '.flex-center': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '.flex-between': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
                '.pos-abs': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                },
                '.pos-abs-x': {
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                },
                '.pos-abs-y': {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                },
                '.custom-shadow': {
                   'box-shadow': '10px 10px 30px 0 #000',
                },
                '.custom-shadow-primary': {
                    'box-shadow': '0 0 30px 0 #6623E8FF',
                },
            });
        },
    ],

}
