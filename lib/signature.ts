import { signatureConfig } from "./config";

export type Employee = {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  website: string;
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

export function normalizeWebsiteUrl(website: string): string {
  const trimmed = website.trim();
  if (!trimmed) return "https://ornatehome.com";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function normalizePhoneHref(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "tel:";
  const international = trimmed.startsWith("+")
    ? `+${digits}`
    : digits.length === 10
      ? `+1${digits}`
      : `+${digits}`;
  return `tel:${international}`;
}

export function createMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`;
}

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "");
}

function absoluteAsset(baseUrl: string, path: string): string {
  return `${normalizeBaseUrl(baseUrl)}${path}`;
}

function contactRow(iconUrl: string, alt: string, content: string): string {
  return `<tr><td width="25" valign="middle" style="padding:0 9px 7px 0;vertical-align:middle;"><img src="${iconUrl}" width="17" height="17" alt="${alt}" style="display:block;width:17px;height:17px;border:0;outline:none;text-decoration:none;"></td><td valign="middle" style="padding:0 0 7px 0;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:18px;font-weight:600;color:#777777;white-space:nowrap;">${content}</td></tr>`;
}

export function generateSignatureHtml(employee: Employee, baseUrl: string): string {
  const name = escapeHtml(employee.fullName.trim());
  const title = escapeHtml(employee.jobTitle.trim());
  const phone = escapeHtml(employee.phone.trim());
  const email = escapeHtml(employee.email.trim());
  const address = escapeHtml(employee.address.trim());
  const website = escapeHtml(employee.website.trim());
  const linkStyle = "color:#777777;text-decoration:none;";
  const assets = {
    logo: absoluteAsset(baseUrl, signatureConfig.logoPath),
    inc: absoluteAsset(baseUrl, signatureConfig.inc5000Path),
    phone: absoluteAsset(baseUrl, signatureConfig.phoneIcon),
    email: absoluteAsset(baseUrl, signatureConfig.emailIcon),
    location: absoluteAsset(baseUrl, signatureConfig.locationIcon),
    website: absoluteAsset(baseUrl, signatureConfig.websiteIcon),
  };

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="808" style="width:808px;max-width:808px;margin:0;border-collapse:collapse;background:#ffffff;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td style="padding:20px 24px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="760" style="width:760px;border-collapse:collapse;table-layout:fixed;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td width="205" valign="middle" style="width:205px;padding:0;vertical-align:middle;"><img src="${assets.logo}" width="205" alt="Ornate Home" style="display:block;width:205px;height:auto;border:0;outline:none;text-decoration:none;"></td><td width="24" style="width:24px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="340" valign="middle" style="width:340px;padding:0;vertical-align:middle;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="340" style="width:340px;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td style="padding:0;font-family:Arial,Helvetica,sans-serif;font-size:27px;line-height:31px;font-weight:700;color:${signatureConfig.accentColor};">${name}</td></tr><tr><td style="padding:1px 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:22px;font-weight:400;color:#333333;">${title}</td></tr><tr><td height="1" style="height:1px;padding:0;background:#e3e3e3;font-size:1px;line-height:1px;">&nbsp;</td></tr><tr><td style="padding:12px 0 0 0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">${contactRow(assets.phone, "", `<a href="${escapeHtml(normalizePhoneHref(employee.phone))}" style="${linkStyle}">${phone}</a>`)}${contactRow(assets.email, "", `<a href="mailto:${email}" style="${linkStyle}">${email}</a>`)}${contactRow(assets.location, "", `<a href="${escapeHtml(createMapsUrl(employee.address))}" style="${linkStyle}">${address}</a>`)}${contactRow(assets.website, "", `<a href="${escapeHtml(normalizeWebsiteUrl(employee.website))}" style="${linkStyle}">${website}</a>`)}</table></td></tr></table></td><td width="20" style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="1" style="width:1px;padding:0;background:#e3e3e3;font-size:1px;line-height:1px;">&nbsp;</td><td width="25" style="width:25px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="145" valign="middle" style="width:145px;padding:0;vertical-align:middle;"><img src="${assets.inc}" width="145" alt="Inc. 5000 — Ranked #689 in 2026" style="display:block;width:145px;height:auto;border:0;outline:none;text-decoration:none;"></td></tr></table></td></tr></table>`;
}

export function generateSignatureText(employee: Employee): string {
  return [
    employee.fullName,
    employee.jobTitle,
    employee.phone,
    employee.email,
    employee.address,
    employee.website,
  ].map((value) => value.trim()).filter(Boolean).join("\n");
}
