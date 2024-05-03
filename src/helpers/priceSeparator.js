export const priceSeparator = (value) =>  value?.toString()?.replace(/\s/g, "")
	.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1,")