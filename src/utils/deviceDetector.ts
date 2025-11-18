export const isMobileDevice = (userAgent: string) => {
  const mobileRegex =
    /(android|iphone|ipod|ipad|windows phone|iemobile|mobile|tablet)/i;

  return mobileRegex.test(userAgent.toLowerCase());
};
