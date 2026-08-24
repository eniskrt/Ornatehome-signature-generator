import { signatureConfig } from "./config";

export type Employee = {
  fullName: string;
  jobTitle: string;
  phone: string;
  linkedinUrl: string;
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

export function normalizeLinkedInUrl(linkedinUrl: string): string {
  const trimmed = linkedinUrl.trim();
  if (!trimmed) return "";
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
  } catch {
    return "";
  }
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
  return `<tr><td width="12" valign="middle" style="padding:0 4px 3px 0;vertical-align:middle;"><img src="${iconUrl}" width="8" height="8" alt="${alt}" style="display:block;width:8px;height:8px;border:0;outline:none;text-decoration:none;"></td><td valign="middle" style="padding:0 0 3px 0;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-size:7px;line-height:9px;font-weight:600;color:#777777;white-space:nowrap;">${content}</td></tr>`;
}

export function generateSignatureHtml(employee: Employee, baseUrl: string): string {
  const name = escapeHtml(employee.fullName.trim());
  const title = escapeHtml(employee.jobTitle.trim());
  const phone = escapeHtml(employee.phone.trim());
  const linkedinUrl = normalizeLinkedInUrl(employee.linkedinUrl);
  const address = escapeHtml(signatureConfig.defaultAddress);
  const website = escapeHtml(employee.website.trim());
  const linkStyle = "color:#777777;text-decoration:none;";
  const assets = {
    logo: absoluteAsset(baseUrl, signatureConfig.logoPath),
    inc: absoluteAsset(baseUrl, signatureConfig.inc5000Path),
    phone: absoluteAsset(baseUrl, signatureConfig.phoneIcon),
    location: absoluteAsset(baseUrl, signatureConfig.locationIcon),
    website: absoluteAsset(baseUrl, signatureConfig.websiteIcon),
  };
  const linkedinRow = linkedinUrl
    ? contactRow(assets.website, "", `<a href="${escapeHtml(linkedinUrl)}" style="${linkStyle}">LinkedIn</a>`)
    : "";

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="400" style="width:400px;max-width:400px;margin:0;border-collapse:collapse;background:#ffffff;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td style="padding:10px 12px;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="376" style="width:376px;border-collapse:collapse;table-layout:fixed;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td width="101" valign="middle" style="width:101px;padding:0;vertical-align:middle;"><img src="${assets.logo}" width="101" alt="Ornate Home" style="display:block;width:101px;height:auto;border:0;outline:none;text-decoration:none;"></td><td width="12" style="width:12px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="168" valign="middle" style="width:168px;padding:0;vertical-align:middle;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" width="168" style="width:168px;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td style="padding:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:16px;font-weight:700;color:${signatureConfig.accentColor};">${name}</td></tr><tr><td style="padding:1px 0 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:11px;font-weight:400;color:#333333;">${title}</td></tr><tr><td height="1" style="height:1px;padding:0;background:#e3e3e3;font-size:1px;line-height:1px;">&nbsp;</td></tr><tr><td style="padding:6px 0 0 0;"><table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">${contactRow(assets.phone, "", `<a href="${escapeHtml(normalizePhoneHref(employee.phone))}" style="${linkStyle}">${phone}</a>`)}${linkedinRow}${contactRow(assets.location, "", `<a href="${escapeHtml(signatureConfig.mapsUrl)}" style="${linkStyle}">${address}</a>`)}${contactRow(assets.website, "", `<a href="${escapeHtml(normalizeWebsiteUrl(employee.website))}" style="${linkStyle}">${website}</a>`)}</table></td></tr></table></td><td width="10" style="width:10px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="1" style="width:1px;padding:0;background:#e3e3e3;font-size:1px;line-height:1px;">&nbsp;</td><td width="12" style="width:12px;padding:0;font-size:0;line-height:0;">&nbsp;</td><td width="72" valign="middle" style="width:72px;padding:0;vertical-align:middle;"><img src="${assets.inc}" width="72" alt="Inc. 5000 — Ranked #689 in 2026" style="display:block;width:72px;height:auto;border:0;outline:none;text-decoration:none;"></td></tr></table></td></tr></table>`;
}

export function generateSignatureText(employee: Employee): string {
  return [
    employee.fullName,
    employee.jobTitle,
    employee.phone,
    normalizeLinkedInUrl(employee.linkedinUrl) ? `LinkedIn: ${normalizeLinkedInUrl(employee.linkedinUrl)}` : "",
    signatureConfig.defaultAddress,
    employee.website,
  ].map((value) => value.trim()).filter(Boolean).join("\n");
}
