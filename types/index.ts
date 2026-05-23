export interface Registration {
  id: string;
  registration_id: string;
  full_name: string;
  email: string;
  phone: string;
  organization: string | null;
  ticket_count: number;
  special_requirements: string | null;
  status: 'registered' | 'checked_in';
  created_at: string;
  checked_in_at: string | null;
}

export interface RegistrationFormData {
  full_name: string;
  email: string;
  phone: string;
  organization?: string;
  ticket_count: number;
  special_requirements?: string;
}

export interface CheckinStats {
  total: number;
  checked_in: number;
  remaining: number;
}
