export const signatureConfig = {
  companyName: "Ornate Home",
  defaultAddress: "2235 N. Tustin Ave. Santa Ana, CA 92705",
  defaultWebsite: "ornatehome.com",
  accentColor: "#ef4035",
  uiAccentColor: "#c53f33",
  logoPath: "/assets/signature/ornate-home-logo.png",
  inc5000Path: "/assets/signature/inc-5000-2026.png",
  phoneIcon: "/assets/signature/phone.png",
  emailIcon: "/assets/signature/email.png",
  locationIcon: "/assets/signature/location.png",
  websiteIcon: "/assets/signature/website.png",
} as const;

export const defaultEmployee = {
  fullName: "John Doe",
  jobTitle: "Job Title",
  phone: "(000) 000 - 0000",
  email: "john.doe@example.com",
  address: signatureConfig.defaultAddress,
  website: signatureConfig.defaultWebsite,
};
