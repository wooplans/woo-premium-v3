export type PlanType = "duplex" | "villa";

export interface PlanFormData {
  title: string;
  type: PlanType;
  description: string;
  surface: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floors: number | null;
  price: number | null;
  features: string[];
  thumbnail: string;
  images: string[];
  isPublished: boolean;
}
