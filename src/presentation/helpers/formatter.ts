export class Formatter {
	static formatDate(date: string) {
		const newDate = date.split('T')[0];

		return newDate;
	}
}
