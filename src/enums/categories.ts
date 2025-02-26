export enum Category {
  MENS_CLOTHING = "men's clothing",
  JEWELRY = "jewelery",
  ELECTRONICS = "electronics",
  WOMENS_CLOTHING = "women's clothing",
}

export const CategoryTranslation: Record<string, string> = {
  [Category.MENS_CLOTHING]: "Roupas Masculinas",
  [Category.JEWELRY]: "Jóias",
  [Category.ELECTRONICS]: "Eletrônicos",
  [Category.WOMENS_CLOTHING]: "Roupas Femininas",
};
