export interface Product {
  productId: string;
  name: string;
  image: string;
  price: number;
}

export interface SubCategory {
  subCategoryId: string;
  name: string;
  products?: Product[];
}

export interface Category {
  categoryId: string;
  name: string;
  image: string;
  subCategories?: SubCategory[];
}

export const dummyCategories: Category[] = [
  {
    categoryId: "1",
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "1-1",
        name: "Beaded Bracelets",
        products: [
          {
            productId: "p1",
            name: "Crystal Beaded Bracelet",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 25.99
          },
          {
            productId: "p2",
            name: "Wooden Beaded Bracelet",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 19.99
          },
          {
            productId: "p3",
            name: "Stone Beaded Bracelet",
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop",
            price: 29.99
          }
        ]
      },
      {
        subCategoryId: "1-2",
        name: "Chain Bracelets",
        products: [
          {
            productId: "p4",
            name: "Gold Chain Bracelet",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
            price: 45.99
          },
          {
            productId: "p5",
            name: "Silver Chain Bracelet",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
            price: 39.99
          }
        ]
      },
      {
        subCategoryId: "1-3",
        name: "Charm Bracelets"
      }
    ]
  },
  {
    categoryId: "2",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "2-1",
        name: "Pendant Necklaces",
        products: [
          {
            productId: "p6",
            name: "Heart Pendant Necklace",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=200&fit=crop",
            price: 55.99
          },
          {
            productId: "p7",
            name: "Crystal Pendant Necklace",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
            price: 65.99
          }
        ]
      },
      {
        subCategoryId: "2-2",
        name: "Beaded Necklaces",
        products: [
          {
            productId: "p8",
            name: "Multi-strand Beaded Necklace",
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop",
            price: 42.99
          }
        ]
      }
    ]
  },
  {
    categoryId: "4",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "4-1",
        name: "Statement Rings",
        products: [
          {
            productId: "p11",
            name: "Gemstone Statement Ring",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop",
            price: 75.99
          }
        ]
      },
      {
        subCategoryId: "4-2",
        name: "Band Rings",
        products: [
          {
            productId: "p12",
            name: "Gold Band Ring",
            image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&h=200&fit=crop",
            price: 35.99
          },
          {
            productId: "p13",
            name: "Silver Band Ring",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 29.99
          }
        ]
      }
    ]
  },
  {
    categoryId: "5",
    name: "Anklets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "5-1",
        name: "Beaded Anklets",
        products: [
          {
            productId: "p14",
            name: "Turquoise Beaded Anklet",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 22.99
          }
        ]
      }
    ]
  },
  {
    categoryId: "7",
    name: "Malas",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "7-1",
        name: "108 Bead Malas",
        products: [
          {
            productId: "p15",
            name: "Rudraksha Mala",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 89.99
          },
          {
            productId: "p16",
            name: "Sandalwood Mala",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 79.99
          },
          {
            productId: "p15",
            name: "Rudraksha Mala",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 89.99
          },
          {
            productId: "p16",
            name: "Sandalwood Mala",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 79.99
          },
          {
            productId: "p15",
            name: "Rudraksha Mala",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 89.99
          },
          {
            productId: "p16",
            name: "Sandalwood Mala",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 79.99
          },
          {
            productId: "p17",
            name: "Crystal Quartz Mala",
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop",
            price: 95.99
          },
          {
            productId: "p18",
            name: "Amethyst Mala",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
            price: 99.99
          }
        ]
      },
      {
        subCategoryId: "7-2",
        name: "Wrist Malas",
        products: [
          {
            productId: "p19",
            name: "Wrist Rudraksha Mala",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
            price: 45.99
          },
          {
            productId: "p20",
            name: "Wrist Sandalwood Mala",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 39.99
          },
          {
            productId: "p21",
            name: "Wrist Tiger Eye Mala",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 52.99
          }
        ]
      }
    ]
  },
  {
    categoryId: "8",
    name: "Ritual Items",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "8-1",
        name: "Prayer Beads",
        products: [
          {
            productId: "p22",
            name: "Tibetan Prayer Beads",
            image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=200&h=200&fit=crop",
            price: 67.99
          },
          {
            productId: "p23",
            name: "Buddhist Prayer Beads",
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop",
            price: 72.99
          }
        ]
      },
      {
        subCategoryId: "8-2",
        name: "Meditation Accessories",
        products: [
          {
            productId: "p24",
            name: "Meditation Cushion Set",
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop",
            price: 125.99
          },
          {
            productId: "p25",
            name: "Singing Bowl",
            image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f42?w=200&h=200&fit=crop",
            price: 145.99
          },
          {
            productId: "p26",
            name: "Incense Holder Set",
            image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=200&h=200&fit=crop",
            price: 34.99
          }
        ]
      },
      {
        subCategoryId: "8-3",
        name: "Sacred Threads",
        products: [
          {
            productId: "p27",
            name: "Red Protection Thread",
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop",
            price: 15.99
          },
          {
            productId: "p28",
            name: "Sacred Kalava Thread",
            image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=200&h=200&fit=crop",
            price: 12.99
          }
        ]
      }
    ]
  },
  {
    categoryId: "9",
    name: "Wrist Beads",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100&h=100&fit=crop",
    subCategories: [
      {
        subCategoryId: "9-1",
        name: "Gemstone Wrist Beads",
        products: [
          {
            productId: "p29",
            name: "Lava Stone Wrist Beads",
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop",
            price: 38.99
          },
          {
            productId: "p30",
            name: "Turquoise Wrist Beads",
            image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=200&h=200&fit=crop",
            price: 44.99
          },
          {
            productId: "p31",
            name: "Black Onyx Wrist Beads",
            image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=200&h=200&fit=crop",
            price: 41.99
          }
        ]
      },
      {
        subCategoryId: "9-2",
        name: "Chakra Wrist Beads",
        products: [
          {
            productId: "p32",
            name: "7 Chakra Wrist Beads",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
            price: 48.99
          },
          {
            productId: "p33",
            name: "Root Chakra Wrist Beads",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
            price: 36.99
          }
        ]
      }
    ]
  },
];
