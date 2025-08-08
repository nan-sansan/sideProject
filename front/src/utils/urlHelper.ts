export const BaseImgUrl = "http://localhost:8080/images/";

export function makeImageUrl(imgId: string) {
  return BaseImgUrl + imgId;
}

export function makeProductUrl(productId: string) {
  return "/product/" + productId;
}
