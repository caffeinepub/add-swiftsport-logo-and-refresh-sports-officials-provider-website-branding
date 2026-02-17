import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export interface RefereeRequest {
  email: string;
  name: string;
  phone: string;
  sport: string;
  numberOfOfficials: number;
  dateTime: string;
  location: string;
  competitionLevel: string;
  numberOfDaysEvent: number;
  eventType: 'Corporate' | 'Community' | 'School/College';
}

export interface QuickRequest {
  name: string;
  email: string;
  phone: string;
  sport: string;
  gameDateFrom: string;
  gameDateTo: string;
  numberOfOfficials: number | string;
  eventType: 'Corporate' | 'Community' | 'School/College';
  notes: string;
}

export function useSubmitRefereeRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RefereeRequest) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Build the message with all request details including event type
      const message = `
Event Type: ${request.eventType}
Sport: ${request.sport}
Number of Officials Required: ${request.numberOfOfficials}
Date & Time: ${new Date(request.dateTime).toLocaleString()}
Location: ${request.location}
Competition Level: ${request.competitionLevel}
Number of Days Event: ${request.numberOfDaysEvent}
      `.trim();

      await actor.submitBookingRequest(
        request.email,
        request.name,
        request.phone,
        message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referee-requests'] });
    },
  });
}

export function useSubmitQuickRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: QuickRequest & { numberOfOfficials: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Build the message with quick request details including event type
      const message = `
Event Type: ${request.eventType}
Sport: ${request.sport}
Number of Officials Required: ${request.numberOfOfficials}
Game Date From: ${request.gameDateFrom}
Game Date To: ${request.gameDateTo}
Notes: ${request.notes || 'None'}
      `.trim();

      await actor.submitQuickRequest(
        request.name,
        request.phone,
        request.email,
        message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referee-requests'] });
    },
  });
}

export function useGetAllRefereeRequests(isAdminConfirmed: boolean = false) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['referee-requests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRequests();
    },
    enabled: !!actor && !isFetching && isAdminConfirmed,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['is-admin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}
