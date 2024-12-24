/** @type {im￼port('tailwindcss').Config} */
// import colors from '@/config/colors';
const colors = {
	primary: {
		50: '#f4f1fe',
		100: '#c6bbfc',
		200: '#aa9afa',
		300: '#846cf8',
		400: '#6c4ff7',
		500: '#4723f5',
		600: '#4120df',
		700: '#3219ae',
		800: '#271387',
		900: '#1e0f67',
	},
	secondary: {
		100: '#f2f4f7',
		200: '#edeff2',
		300: '#e6e8ed',
		400: '#dadde3',
		500: '#ced3db',
		600: '#b0b5bf',
		700: '#7b818c',
		800: '#F2F5FA',
	},
	failed: {
		50: '#fbe8e9',
		100: '#f4b6ba',
		200: '#ee9399',
		300: '#e7626a',
		400: '#e2444d',
		500: '#db1521',
		600: '#c7131e',
		700: '#9b0f17',
		800: '#780c12',
		900: '#5c090e',
	},
	success: {
		50: '#e8f4ee',
		100: '#b7dec9',
		200: '#94ceaf',
		300: '#63b78b',
		400: '#45a975',
		500: '#169452',
		600: '#14874b',
		700: '#10693a',
		800: '#0c512d',
		900: '#093e22',
	},
	grey: {
		100: '#adb2b8',
		200: '#93999e',
		300: '#797F85',
		400: '#4d4f52',
		500: '#0d0d0e',
	},

	strk: {
		s1: "#f0f1f7",
		s2: "#edeef2",
		s3: "#e6e7ed",
		s4: "#dfe0e5",
		s5: "#cdced1",
		s6: "#373b47",
	},
	muted:{
		100:"#6c757d"
	}

};
module.exports = {
	content: [ './index.html', './src/**/*.{vue,js,ts,jsx,tsx}' ],
	theme: {
		extend: {
			colors,
			flexGrow: {
				2: 2,
			},
			spacing: {
				sideBar: '16rem',
				minmialSidebar: '5rem'
			},
			borderWidth: {
				0.5: '0.5px',
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
			},
		},
	},
	plugins: [],
};
