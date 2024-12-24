export const useImg = (folder: string = '/', name: string) => {
  return new URL(
    `../assets/images${folder}${name}`
    , import.meta.url).href;
}
export const useSvg = (name: string) => {
  return name ? new URL(
    `../assets/icons/${name}.svg`
    , import.meta.url).href : '';
}