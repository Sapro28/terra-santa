import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == $id][0]{
    schoolName,
    navigation[]{
      label,
      link{
        linkType,
        routeKey,
        externalUrl,
        openInNewTab
      },
      // Legacy fields (will disappear once all docs are migrated)
      navType,
      routeKey,
      externalUrl,
      openInNewTab,
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
