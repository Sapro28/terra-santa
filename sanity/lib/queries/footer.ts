import { groq } from 'next-sanity';

export const footerQuery = groq`
  *[_type == "footer" && _id == $id][0]{
    schoolName,
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
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == $id][0]{
    schoolName,
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
