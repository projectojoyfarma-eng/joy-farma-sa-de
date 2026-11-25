import {
  Bandage, CalendarHeart, Droplet, Dumbbell, Flame, Flower2, Hand, Heart,
  HeartPulse, Milk, Pill, ShieldPlus, Smile, Sun, Wind, type LucideIcon,
} from "lucide-react";

export type Category = { slug: string; name: string; icon: LucideIcon };

const make = (name: string, icon: LucideIcon): Category => ({
  name,
  icon,
  slug: name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
});

// Fixed order and names required by the store owner — do not reorder or rename.
export const CATEGORIES: Category[] = [
  make("Antidiabéticos", Droplet),
  make("Antitússicos", Wind),
  make("Antibióticos", Pill),
  make("Área Sexual", Heart),
  make("Analgésicos", Bandage),
  make("Anti-inflamatórios", ShieldPlus),
  make("Anticoncepcionais", CalendarHeart),
  make("Suplementos", Dumbbell),
  make("Gastrite", Flame),
  make("Dentários", Smile),
  make("Higiene Feminina", Flower2),
  make("Hipertensão", HeartPulse),
  make("Leite Infantil", Milk),
  make("Pomadas", Hand),
  make("Vitaminas", Sun),
];

export const findCategory = (slug: string | undefined) => CATEGORIES.find((c) => c.slug === slug);
