import { describe, expect, it } from "vitest";
import { CATEGORIES } from "@/lib/categories";

describe("categorias", () => {
  it("tem exactamente as 15 categorias na ordem fixa", () => {
    expect(CATEGORIES.map((c) => c.name)).toEqual([
      "Antidiabéticos",
      "Antitússicos",
      "Antibióticos",
      "Área Sexual",
      "Analgésicos",
      "Anti-inflamatórios",
      "Anticoncepcionais",
      "Suplementos",
      "Gastrite",
      "Dentários",
      "Higiene Feminina",
      "Hipertensão",
      "Leite Infantil",
      "Pomadas",
      "Vitaminas",
    ]);
  });
  it("tem slugs únicos", () => {
    expect(new Set(CATEGORIES.map((c) => c.slug)).size).toBe(15);
  });
});
