import { z } from "zod";

export const DOC_TYPES = ["V", "E", "J", "P", "G", "C", "R"] as const;

export const MSG_REQUIRE_NAME_OR_DOC =
  "Indica al menos el nombre o la cédula de quien buscas.";

export function getCrossFieldErrors(data: {
  qNombre: string;
  qDocNumero: string;
}): Partial<Record<"qNombre" | "qDocNumero", string>> {
  if (data.qNombre.trim() === "" && data.qDocNumero.trim() === "") {
    return { qNombre: MSG_REQUIRE_NAME_OR_DOC, qDocNumero: MSG_REQUIRE_NAME_OR_DOC };
  }
  return {};
}

export const searchByImageSchema = z
  .object({
    photos: z
      .array(z.any())
      .min(
        1,
        "Por favor, selecciona o sube al menos una foto de la persona que buscas.",
      ),
    qNombre: z.string().trim(),
    qDocTipo: z.enum(DOC_TYPES),
    qDocNumero: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    const errors = getCrossFieldErrors(data);
    if (errors.qNombre) {
      ctx.addIssue({
        code: "custom",
        input: data.qNombre,
        message: errors.qNombre,
        path: ["qNombre"],
      });
    }
    if (errors.qDocNumero) {
      ctx.addIssue({
        code: "custom",
        input: data.qDocNumero,
        message: errors.qDocNumero,
        path: ["qDocNumero"],
      });
    }
  });

export type SearchMissingFormValues = z.infer<typeof searchByImageSchema>;
export type SearchDocTipo = SearchMissingFormValues["qDocTipo"];

export const searchByImageDefaults: SearchMissingFormValues = {
  photos: [],
  qNombre: "",
  qDocTipo: "V",
  qDocNumero: "",
};
