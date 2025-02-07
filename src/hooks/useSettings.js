import { useQuery } from '@tanstack/react-query';
import { profile } from '../api/api';

export const useSettings = () => {
	return useQuery({
		queryKey: ['settings'], 
		queryFn: () => profile.getSettings(), 
		select: data => data.data,
	})
}