export interface IPrice{
    "regularPrice": number,
    "finalPrice": number,
    "floorPrice": number
}

export interface IDisplayAssets {
    "displayAsset": string,
     "materialInstance": string,
   "primaryMode": string,
    "productTag": string,
     "url": string,
  "flipbook": string | null,
    "background_texture": string | null,
   "background": string,
   "full_background": string
}


export interface IGoodsItemProps{
    "mainId": string,
    "displayName": string,
    "displayDescription": string,
    "price": IPrice,
    "displayAssets": IDisplayAssets[]
}