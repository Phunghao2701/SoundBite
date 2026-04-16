// src/data/sounds.js

export const CATEGORIES = [
  { id: 1, name: 'Tất cả', query: 'all' },
  { id: 2, name: 'Meme vui nhộn', query: 'meme' },
  { id: 3, name: 'Điện ảnh (Cinematic)', query: 'cinematic' },
  { id: 4, name: 'Kinh dị (Horror)', query: 'horror' },
  { id: 5, name: 'Chuyển cảnh (Transition)', query: 'transition' },
  { id: 6, name: 'Thiên nhiên', query: 'nature' },
  { id: 7, name: 'Hành động', query: 'action' },
  { id: 8, name: 'Tiếng cười', query: 'laugh' }
];

export const APP_CONFIG = {
  ITEMS_PER_PAGE: 24,
  DEFAULT_QUERY: 'meme',
  WAVEFORM_COLOR: '#6366f1' // Màu tím Indigo của Tailwind
};