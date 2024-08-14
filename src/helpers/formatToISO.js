export const formatToISO = (date) => {
	if (!(date instanceof Date)) return null; // Проверяем, является ли входной параметр объектом Date

	const offsetMinutes = date.getTimezoneOffset(); // Получаем смещение в минутах от UTC
	const localISOTime = (new Date(date.getTime() - (offsetMinutes * 60 * 1000)).toISOString()); // Корректируем время на смещение часового пояса
	const isoTimeWithoutTimeZone = localISOTime.substring(0, localISOTime.lastIndexOf('.')); // Удаляем миллисекунды и информацию о часовом поясе
	return isoTimeWithoutTimeZone;
}
