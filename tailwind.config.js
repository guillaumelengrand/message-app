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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
