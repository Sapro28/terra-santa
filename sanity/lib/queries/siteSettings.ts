import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && language == $lang][0]{
    schoolName,
    navigation[]{
      navType,
      routeKey,
      externalUrl,
      openInNewTab,
      label,
      href
    },
    footer{
      addressLine1,
      phone,
      tagline,
      hoursTitle,
      hoursLine1,
      hoursLine2,
      rights
    }
  }
`;
