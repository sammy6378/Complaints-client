import { z } from "zod";


export const validateCategory = z.object({
    category_name: z
        .string()
        .min(1, "Category name is required")
        .max(100, "Category name must be less than 100 characters"),
    description: z
        .string()
        .min(10, "Description is required")
        .max(500, "Description must be less than 500 characters")
        .optional(),
})


export const validateSubCategory = z.object({
    subcategory_name: z
        .string()
        .min(1, "Subcategory name is required")
        .max(100, "Subcategory name must be less than 100 characters"),
    description: z
        .string()
        .min(10, "Description is required")
        .max(500, "Description must be less than 500 characters")
        .optional(),
})