/**
 * Unsplash curated photo IDs por sector
 * Free, no API key needed — direct image URLs
 * Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w={W}&q=80
 */

const BASE = 'https://images.unsplash.com/photo';

export interface SectorImages {
  hero: string;
  about: string;
  blog: string;
  og: string; // Open Graph 1200x630
}

const SECTOR_PHOTOS: Record<string, { hero: string; about: string; blog: string }> = {
  electricista: {
    hero:  '1621905251189-08b1d44bfcc6', // electrician working on panel
    about: '1581091226825-a6d3e3e6b284', // electrical workshop
    blog:  '1558618666-fcd25c85cd64', // circuit board
  },
  fontanero: {
    hero:  '1585771724684-38269d6639fd', // plumber with tools
    about: '1504328345606-18bbc8c9d7d1', // plumbing tools
    blog:  '1542013006-27d56b8cd421', // pipes
  },
  peluqueria: {
    hero:  '1560066984-138dadb4c035', // modern hair salon
    about: '1522337360826-074b8aca2a7c', // hairdresser working
    blog:  '1522337913036-8408f5e11fa4', // hair styling
  },
  dentista: {
    hero:  '1606811841689-23dfddce3e95', // dental clinic modern
    about: '1559839734-2b71ea197ec2', // dental office bright
    blog:  '1588776814546-1ffb600e1c89', // dental tools
  },
  restaurante: {
    hero:  '1517248135467-4c7edcad34c4', // elegant restaurant interior
    about: '1414235077428-338989a2e8c0', // chef preparing food
    blog:  '1504674900247-0877df9cc836', // food plate
  },
  gimnasio: {
    hero:  '1534438327276-14e5300c3a48', // modern gym interior
    about: '1571902943202-507ec2618e8f', // personal trainer
    blog:  '1517836357463-d25dfeac3438', // workout equipment
  },
  taller: {
    hero:  '1625047509249-de9a5e3f2bb0', // mechanic working on car
    about: '1486262322744-1aecb2edd945', // auto workshop
    blog:  '1492144534655-ae79c964c9d7', // car engine
  },
};

const FALLBACK = {
  hero:  '1497366216548-37526070297c', // modern office/business
  about: '1521791136064-7986c2920216', // team working
  blog:  '1499750310107-5fef28a66643', // laptop workspace
};

function url(id: string, w: number, h?: number): string {
  const crop = h ? `&h=${h}&fit=crop` : '&fit=crop';
  return `${BASE}-${id}?auto=format${crop}&w=${w}&q=80`;
}

export function getSectorImages(sector: string): SectorImages {
  const photos = SECTOR_PHOTOS[sector?.toLowerCase()] || FALLBACK;
  return {
    hero:  url(photos.hero,  1920, 1080),
    about: url(photos.about, 800,  600),
    blog:  url(photos.blog,  800,  450),
    og:    url(photos.hero,  1200, 630),
  };
}

export function unsplash(id: string, w = 800, h?: number): string {
  return url(id, w, h);
}
