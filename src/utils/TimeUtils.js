export const TimeUtils = {

  millsToReadableDate: (timeInMills, pattern = "dd.MM.yyyy. HH:mm") => {
    const date = new Date(timeInMills);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options);
  },

  millsToReadableDateWithHoursMinutes: (timeInMills, pattern = "dd.MM.yyyy. HH:mm") => {
    const date = new Date(timeInMills);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options);
  },

  calculateDays: (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
};