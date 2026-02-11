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
    // Footer logos are shared across all languages via the singleton (siteAssets).
    // Back-compat: if footerLogos is empty considers any extra headerLogos beyond the first
    // (so you can "move" the second header logo to the footer without re-uploading).
    "footerLogos": coalesce(
      *[_type == "siteAssets" && _id == "siteAssets"][0].footerLogos[]{
        "url": asset->url,
        "alt": coalesce(alt, ""),
        "link": link
      },
      select(
        count(*[_type == "siteAssets" && _id == "siteAssets"][0].headerLogos) > 1 =>
          *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogos[1..100]{
            "url": asset->url,
            "alt": coalesce(alt, ""),
            "link": null
          },
        []
      ),
      []
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
