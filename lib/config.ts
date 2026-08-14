export const signatureConfig = {
  companyName: "Ornate Home",
  defaultAddress: "2235 N. Tustin Ave. Santa Ana, CA 92705",
  defaultWebsite: "ornatehome.com",
  mapsUrl: "https://www.google.com/maps/place/Ornate+Home+Furniture+and+Mattress/@33.765679,-117.8623223,13z/data=!4m6!3m5!1s0x80dcd928fa1ab30d:0xfee18cda3e3fd2e!8m2!3d33.7666021!4d-117.8353715!16s%2Fg%2F11qgzbd8ck?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
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
