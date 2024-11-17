export interface CreateCompanyWithUserDTO {
  companyName: string;
  user: {
    name: string;
    email: string;
    role: "admin" | "user";
  };
}
