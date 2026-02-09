import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == $id][0]{
    schoolName,
    // Prefer the shared logo (siteAssets), but fall back to the per-language logo if set.
    "headerLogoUrl": coalesce(
      *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogo.asset->url,
      headerLogo.asset->url
    ),
    "headerLogoAlt": coalesce(
      *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogo.alt,
      headerLogo.alt,
      ""
    ),
    footer{
      addressLine1,
      phone,
      tagline,
      hoursTitle,
      hoursLine1,
      hoursLine2,
      rights,
      socialLinks[]{
        platform,
        url
      }
    }
  }
`;
