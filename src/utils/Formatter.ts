export class Formatter {
    static formatDate(date: Date): string {
        const formattedDate = new Date(date);

        return Intl.DateTimeFormat('ES-es', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
        }).format(formattedDate);
    }
}