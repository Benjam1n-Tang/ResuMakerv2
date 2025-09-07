export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const convertToBullet = (text: string): string[] => {
  return text
    .split("\n") 
    .map(line => line.trim()) 
    .filter(line => line.length > 0) 
    .map(line => (line.startsWith("-") ? line.slice(1).trim() : line)); 
};

export const convertToString = (lines: string[]): string => {
  return lines.map(line => `- ${line.trim()}`).join("\n");
};

export const seperateString = (text: string): string[] => {
  return text.split(";").filter(line => line.length > 0)
};

export const seperateArray = (lines: string[]): string => {
  return lines.map(line => `${line.trim()}`).join("; ");
};
