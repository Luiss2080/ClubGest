export interface Project {
  id: number;
  title: string;
  description?: string;
  target_budget: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Activity {
  id: number;
  project_id: number;
  name: string;
  scheduled_at: string;
  location?: string;
  type: 'fundraising' | 'social_impact' | 'other';
  status: 'planned' | 'in_progress' | 'finished' | 'cancelled';
}

export interface Donation {
  id: number;
  sponsor_id: number;
  amount: string;
  donation_date: string;
}
