export type THospital = {
  name: string;
  address?: string;
  phone?: string;
  services: string[];
  status?: "active" | "inactive";
};
