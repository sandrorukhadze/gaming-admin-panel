export interface Raffle {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  drawDate: string;
  status: 'draft' | 'active' | 'drawn' | 'cancelled';
  ticketPrice: number;
  maxTicketsPerUser: number;
  totalTicketLimit: number | null;
  createdAt: string;
  updatedAt: string;
}