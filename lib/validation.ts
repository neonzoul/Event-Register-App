import { z } from 'zod';

export const registrationSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format').max(255),
  phone: z.string().regex(/^[0-9\-]{9,12}$/, 'Please enter a valid phone number'),
  organization: z.string().max(200).optional().or(z.literal('')),
  ticket_count: z.number().int().min(1, 'At least 1 ticket is required').max(5, 'Maximum 5 tickets allowed'),
  special_requirements: z.string().max(500).optional().or(z.literal('')),
});

export const checkinSchema = z.object({
  registration_id: z.string().min(1, 'missing registration_id'),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
