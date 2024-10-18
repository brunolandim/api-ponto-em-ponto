export function getCreatedAt4DigitShortCode(): string {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const timestamp = new Date(formattedDate).getTime();
  const randomComponent = Math.floor(Math.random() * 1000);
  const fourDigitSortNumber = (timestamp + randomComponent) % 10000;
  return fourDigitSortNumber.toString();
}