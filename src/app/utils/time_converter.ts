export function convertTo12Hour(time:string) {
    // Extract hours and minutes from the time string
    const [hours, minutes] = time.split(':');
  
    // Convert hours to number
    let hour = parseInt(hours, 10);
  
    // Determine whether it's AM or PM
    const period = hour >= 12 ? 'PM' : 'AM';
  
    // Adjust hour if it's greater than 12
    hour = hour % 12 || 12;
  
    // Create the 12-hour time string
    const convertedTime = `${hour}:${minutes +""+ period}`;
  
    return convertedTime;
  }