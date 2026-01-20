export const transformDuration = (duration) => {
	console.log(`${duration?.retentionHours}/${duration?.publishDays}`);

	if(!duration || !duration?.publishDays || !duration?.retentionHours) return '-'
	if(duration.publishDays < 3) return `${duration?.retentionHours}/${+duration?.publishDays * 24}`
	
	return `${duration?.retentionHours}/${duration?.publishDays}`
}