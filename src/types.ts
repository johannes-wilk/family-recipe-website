export interface Recipe {
  title: string;
  description: string;
  image: string;
  author: string;
  cuisine: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  prepTime: number;
  servings: number;
  vegetarian?: boolean;
  vegan?: boolean;
  ingredients: string[];
  steps: string[];
  links?: { text: string; url: string }[];
  publishDate: string;
  slug: string;
}

export interface Contributor {
  name: string;
  color: string;
  bgColor: string;
}

export const contributors: Contributor[] = [
  { name: 'Max', color: 'pastel-green', bgColor: 'bg-pastel-green' },
  { name: 'Hansi', color: 'terracotta', bgColor: 'bg-terracotta' },
  { name: 'Flori', color: 'mustard', bgColor: 'bg-mustard' },
  { name: 'Beni', color: 'dusty-blue', bgColor: 'bg-dusty-blue' }
];
