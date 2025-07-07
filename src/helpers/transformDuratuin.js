export const transformDuration = (duration) => {
	if(!duration || !duration?.publishDays || !duration?.retentionHours) return '-'
	if(duration.publishDays < 3) return `${duration?.retentionHours}/${+duration?.publishDays * 24}`

	return `${duration?.retentionHours}/${duration?.publishDays}`
}