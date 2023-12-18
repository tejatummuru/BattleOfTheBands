export const generateRandomPinks = (length) => {
    const pinks = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#DB7093'];
    return Array.from({ length }, () => pinks[Math.floor(Math.random() * pinks.length)]);
  };