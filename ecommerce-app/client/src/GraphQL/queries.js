export const FETCH_BRANDS = `
                            query{
                                brands{
                                    id
                                    name
                                    description
                                    Image{
                                        url
                                    }
                                }
                            }`;
export const FETCH_BREWS_BY_BRAND = (brandId)=>`
                            query{
                                brand(id: "${brandId}"){
                                    name
                                    brews{
                                        id
                                        name
                                        price
                                        description
                                        image{
                                            url
                                        }
                                    }
                                }
                            }`;
                        
