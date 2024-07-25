export const TimeUtils = {
    millsToReadableDate: (timeInMills, pattern = "dd.MM.yyyy. HH:mm") => {
      const date = new Date(timeInMills);
      const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-GB', options);
    }
  };
  