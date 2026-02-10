import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == $id][0]{
    schoolName,
    // Prefer shared logos from the singleton (siteAssets), but fall back to legacy fields if needed.
    "headerLogos": coalesce(
      *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogos[]{
        "url": asset->url,
        "alt": coalesce(alt, "")
      },
      select(
        defined(*[_type == "siteAssets" && _id == "siteAssets"][0].headerLogo.asset->url) => [
          {
            "url": *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogo.asset->url,
            "alt": coalesce(*[_type == "siteAssets" && _id == "siteAssets"][0].headerLogo.alt, "")
          }
        ],
        []
      ),
      select(
        defined(headerLogo.asset->url) => [
          { "url": headerLogo.asset->url, "alt": coalesce(headerLogo.alt, "") }
        ],
        []
      )
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
