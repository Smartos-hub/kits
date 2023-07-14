export const getFileName = (url: string) =>
  url.split('/').pop()?.split(/-(.*)/)?.[1];

export const formatFileName = (name: string | undefined) =>
  name?.replace(/_| /g, '').trim().toLowerCase();
