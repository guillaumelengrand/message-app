module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                'screen-5': '5vh',
                'screen-90': '90vh',
                'screen-95': '95vh',
            },
            colors: {
                'dark-blue': '#0f0e17',
                'low-white': '#fffffe',
                'grey-paraph': '#a7a9be',
                'btn-orange': '#ff8906',
                'dark-orange': '#f25f4c',
                'low-pink': '#e53170',
                'dark-grey': '#2e2f3e',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
