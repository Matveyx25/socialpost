export const contractSubjectsOptions = [
	{ value: "REPRESENTATION", label: "Представительство" },
	{ value: "DISTRIBUTION", label: "Распространение рекламы" },
	{
		value: "ORG_DISTRIBUTION",
		label: "Организация Распространение рекламы",
	},
	{ value: "MEDIATION", label: "Посредничество" },
	{ value: "OTHER", label: "Иное" },
]

export const contractSubjectsDecode = {
	"REPRESENTATION": "Представительство",
	"DISTRIBUTION": "Распространение рекламы",
	"ORG_DISTRIBUTION": "Организация :аспространение рекламы",
	"MEDIATION": "Посредничество",
	"OTHER": "Иное",
}