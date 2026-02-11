import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == $id][0]{
    schoolName,

    "headerLogos": *[_type == "siteAssets" && _id == "siteAssets"][0].headerLogos[]{
      "url": asset->url,
      "alt": coalesce(alt, "")
    },

    footer{
      brandName,
      brandLogo{
        "url": asset->url,
        "alt": coalesce(alt, "")
      },
      rights,
      socialLinks[]{
        platform,
        url
      },
      leftText,
      columns[]{
        _key,
        title,
        body,
        links[]{
          _key,
          label,
          url
        },
        images[]{
          _key,
          "url": asset->url,
          "alt": coalesce(alt, ""),
          "link": coalesce(link, "")
        }
      },
      bottomLinks[]{
        _key,
        label,
        url
      }
    }
  }
`;
