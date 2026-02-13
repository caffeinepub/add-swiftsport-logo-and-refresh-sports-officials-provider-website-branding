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
}

export function useSubmitRefereeRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RefereeRequest) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Note: Backend currently has a different schema (jobSeeker, investor, etc.)
      // This will need backend update to properly store referee requests
      // For now, we'll use the existing method with adapted fields
      await actor.createLeadCaptureRequest(
        request.email,
        request.name,
        request.phone,
        false, // jobSeeker - not used
        false, // foundingInterest - not used
        false, // investor - not used
        false  // internInterest - not used
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referee-requests'] });
    },
  });
}

export function useGetAllRefereeRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['referee-requests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRequests();
    },
    enabled: !!actor && !isFetching,
  });
}
