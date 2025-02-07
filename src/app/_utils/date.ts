export const formatDateToKorean = (date: string | Date): string => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${hours}시 ${minutes}분`;
};
