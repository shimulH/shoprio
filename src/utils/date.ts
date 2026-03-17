import moment from "moment";

/**
 * default date this format: (12 Oct, 2002)
 * M_D_Y this format: (Oct 12, 2002)
 * D_M_Y_T this format: (12 Oct, 2002, 12:00 AM)
 * MM_D_Y this format: (October 12, 2002)
 * D_M_T this format: (Sun 11:48 am) & (12 Oct at 11:48 am)
 * Y_M_D this format: (2002-10-12)
 * fromNow this format: (20 minutes ago) | (2 hours ago) | (2 days ago) | (2 months ago) | (2 years ago)
 */
export const formatDate = (
  date: string | Date,
  format?: "D_M_Y_T" | "M_D_Y" | "MM_D_Y" | "D_M_T" | "fromNow" | "Y_M_D",
) => {
  const now = moment();
  switch (format) {
    case "D_M_Y_T":
      return moment.utc(date).format("D MMM, YYYY, h:mm A");

    case "MM_D_Y":
      return moment(date).format("MMMM DD, yyyy");

    case "M_D_Y":
      return moment(date).format("MMM D, YYYY");

    case "Y_M_D":
      return moment(date).format("YYYY-MM-DD");

    case "D_M_T":
      // Calculate the difference in days
      const diffDays = moment(date).diff(now, "days");

      let formattedDate: string;

      if (-diffDays <= 7) {
        formattedDate = moment(date).format("ddd hh:mm a"); // Short format for dates within 7 days
      } else {
        formattedDate = moment(date).format("DD MMM [AT] hh:mm a"); // Longer format for dates beyond 7 days
      }
      return formattedDate;

    case "fromNow":
      // return moment(date).fromNow();
      const inputDate = moment(date);

      const diffInMinutes = now.diff(inputDate, "minutes");
      const diffInHours = now.diff(inputDate, "hours");
      const diffInDays = now.diff(inputDate, "days");
      const diffInMonths = now.diff(inputDate, "months");
      const diffInYears = now.diff(inputDate, "years");

      if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
      } else if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
      } else if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
      } else {
        return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
      }

    default:
      return moment(date).format("DD MMM YYYY");
  }
};

// Relative time formatter
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  return formatDate(date);
}
