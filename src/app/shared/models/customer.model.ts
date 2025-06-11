export interface Customer {
  CustomerID: number;
  FullName: string;
  Email: string;
  Phone: string;
  Gender: string;
  BirthDate: string;
  Channel: string;
  IsMember: boolean;
  CreatedAt: string;
  UpdatedAt: string | null;
}
