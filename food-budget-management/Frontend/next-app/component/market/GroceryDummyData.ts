import type { Store } from "./Grocery";

const categories = [
  { id: 'Milk', icon: '🥛', name: 'Milk', count: 48 },
  { id: 'Bread', icon: '🍞', name: 'Bread', count: 32 },
  { id: 'Fruits', icon: '🍎', name: 'Fruits', count: 27 },
  { id: 'Vegetables', icon: '🥦', name: 'Vegetables', count: 19 },
  { id: 'Canned Food', icon: '🥫', name: 'Canned Food', count: 55 },
  { id: 'Eggs', icon: '🥚', name: 'Eggs', count: 63 },
  { id: 'Butter', icon: '🧈', name: 'Butter', count: 41 },
  { id: 'Cheese', icon: '🧀', name: 'Cheese', count: 72 },
  { id: 'Yogurt', icon: '🍶', name: 'Yogurt', count: 72 },
  { id: 'Meat', icon: '🥩', name: 'Meat', count: 72 },
  { id: 'Seafood', icon: '🐟', name: 'Seafood', count: 72 },
  { id: 'Deli', icon: '🥪', name: 'Deli', count: 72 },
  { id: 'Condiments & Spices', icon: '🧂', name: 'Condiments & Spices', count: 72 },
  { id: 'Snacks', icon: '🍿', name: 'Snacks', count: 72 },
  { id: 'Beverage', icon: '🧃', name: 'Beverages', count: 72 },
  { id: 'Pasta', icon: '🍝', name: 'Pasta', count: 72 },
  { id: 'Rice', icon: '🍚', name: 'Rice', count: 72 },
  { id: 'Baking', icon: '🧁', name: 'Baking', count: 72 },
  { id: 'Bakery', icon: '🥐', name: 'Bakery', count: 72 },
  { id: 'Frozen Food', icon: '🧊', name: 'Frozen Food', count: 72 }
];
export const STORES: Store[] = [
  {
    id: 'walmart',
    name: 'Walmart',
    tagline: 'Save Money. Live Better.',
    initial: 'W',
    categories: categories,
  },
  {
    id: 'nofrills',
    name: 'No Frills',
    tagline: "You get what you pay for, and nothing else.",
    initial: 'NF',
    categories: categories
  },
  {
    id: 'costco',
    name: 'Costco',
    tagline: 'Bulk value, every visit.',
    initial: 'C',
    categories: categories
  },
  {
    id: 'freshco',
    name: 'FreshCo',
    tagline: 'Fresh finds, smart savings.',
    initial: 'FC',
    categories: categories,
  },
  {
    id: 'sobeys',
    name: 'Sobeys',
    tagline: 'Better food, better life.',
    initial: 'S',
    categories: categories
  },
];

export const STORE_THEME: Record<string, { dot: string; badge: string; border: string }> = {
  walmart:  { dot: 'bg-blue-950 text-blue-400',    badge: 'bg-blue-950 text-blue-400',    border: 'border-blue-800'   },
  nofrills: { dot: 'bg-orange-950 text-orange-400',badge: 'bg-orange-950 text-orange-400',border: 'border-orange-800' },
  costco:   { dot: 'bg-purple-950 text-purple-400',badge: 'bg-purple-950 text-purple-400',border: 'border-purple-800' },
  freshco:  { dot: 'bg-teal-950 text-teal-400',    badge: 'bg-teal-950 text-teal-400',    border: 'border-teal-800'   },
  sobeys:   { dot: 'bg-red-950 text-red-400',      badge: 'bg-red-950 text-red-400',      border: 'border-red-800'    },
};