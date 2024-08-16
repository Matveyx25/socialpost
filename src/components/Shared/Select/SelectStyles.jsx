export const selectStyles = ({styles, fullWidth}) => ({
	...styles,
	control: (baseStyles) => ({
		...baseStyles,
		borderColor: '#E9EAEA',
		borderRadius: 8,
		minHeight: 48,
		paddingLeft: 16,
		paddingRight: 16,
		"@media (max-width: 1260px)": {
			padding: 6,
			minHeight: 32,
			fontSize: 12
		},
		"@media (max-width: 820px)": {
			padding: 16,
			minHeight: 52,
			fontSize: 16
		},
		"@media (max-width: 420px)": {
			padding: '12px 16px',
			minHeight: 40,
			fontSize: 14
		},
	}),
	menu: (baseStyles) => ({
		...baseStyles,
		border: '1px solid #BDBEC0',
		borderRadius: 8,
		minWidth: 'fit-content',
		boxShadow: '0px 4px 20px 0px rgba(212, 217, 222, 0.25)',
		"@media (max-width: 1260px)": {
			fontSize: 12
		},
		"@media (max-width: 820px)": {
			fontSize: 16
		},
		"@media (max-width: 420px)": {
			fontSize: 14
		}
	}),
	container: (baseStyles) => ({
		...baseStyles,
		width: fullWidth ? '100%' : 'fit-content'
	}),
	singleValue: (baseStyles) => ({
		...baseStyles,
		padding: 0,
		"@media (max-width: 1260px)": {
			fontSize: 12
		},
		"@media (max-width: 820px)": {
			fontSize: 16
		},
		"@media (max-width: 420px)": {
			fontSize: 14
		}
	}),
	option: (baseStyles, {isSelected}) => ({
		...baseStyles,
		padding: '0.5rem 0.75rem',
		color: '#4F5157',
		fontFamily: 'SF Regular',
		fontSize: '1rem',
		lineHeight: '1.5rem',
		minWidth: 'fit-content',
		background: isSelected ? 'rgba(237, 241, 255, 1)' : 'none', 
		"&:hover": {
			background: 'rgba(237, 241, 255, 1)'
		},
		"@media (max-width: 1260px)": {
			fontSize: 12
		},
		"@media (max-width: 820px)": {
			fontSize: 16
		},
		"@media (max-width: 420px)": {
			fontSize: 14
		}
	}),
	multiValue: (styles, { data }) => {
		return {
			...styles,
			backgroundColor: '#F3F3F3',
			fontSize: 16,
			fontFamily: 'SF Regular',
			padding: '1px 4px',
			lineHeight: '1.5rem',
			marginTop: 0,
			marginBottom: 3,
			color: '#4F5157',
			"@media (max-width: 1260px)": {
				fontSize: 12,
				padding: '2px 4px',
				lineHeight: '1rem',
			}
		};
	},
	multiValueLabel: (baseStyles) => ({
		...baseStyles,
		paddingTop: 0,
		paddingBottom: 0 
	}),
	valueContainer: (baseStyles)=> ({
		...baseStyles,
		padding: 0,
		paddingRight: 8,
		minHeight: 0
	}),
	indicatorsContainer: (baseStyles) => ({
		...baseStyles,
		"@media (max-width: 1260px)": {
			height: 20
		}
	}),
	multiValueContainer: (baseStyles) => ({
		...baseStyles,
		height: 20
	}),
	clearIndicator: (baseStyles) => ({
		...baseStyles, 
		padding: 0
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	dropdownIndicator: (baseStyles) => ({
		...baseStyles,
		padding: 0,
		"@media (max-width: 1260px)": {
			width: 14,
			height: 14
		},
		"@media (max-width: 820px)": {
			width: 20,
			height: 20
		},
		"@media (max-width: 420px)": {
			width: 16,
			height: 16
		}
	}),
})