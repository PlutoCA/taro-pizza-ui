import pca from "./pca.json";

/**
 * 获取省份数组
 */
export function getProvinces() {
  return Object.keys(pca);
}

/**
 * 获取省、直辖市的区、县数组
 * @param {string} province 省、直辖市
 */
export function getCities(province) {
  return Object.keys(pca[province]);
}

/**
 * 获取区数组
 * @param {string} province 省
 * @param {string} city 市
 */
export function getAreas(province, city) {
  return pca[province][city];
}
