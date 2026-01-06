export const baseURL = "https://api.disabilityinclusionresourcehub.com";

export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || `${baseURL}/handicap/api/v1`;
};
