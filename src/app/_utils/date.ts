export const formatDateToKorean = (date: string | Date): string => {
  const dateObj = new Date(date);
  return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};
