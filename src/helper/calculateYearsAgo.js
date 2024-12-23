const calculateYearsAgo=(date)=>{
    if (!date) return "";
    const pastDate = new Date(date);
    const currentDate = new Date();

    const differenceInDays = (currentDate - pastDate) / (1000 * 60 * 60 * 24);
    const differenceInYears = differenceInDays / 365.25;
    const differenceInMonths = differenceInYears * 12;

    if (differenceInYears < 0.1) return "written recently";
    if (differenceInYears < 1)
      return differenceInMonths.toFixed(1) + " months ago";
    return differenceInYears.toFixed(1) + " years ago";
}
export default calculateYearsAgo;