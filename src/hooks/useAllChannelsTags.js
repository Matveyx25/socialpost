import { useQuery } from '@tanstack/react-query';
import { channels } from '../api/api';

export const useAllChannelsTags = () => {
	return useQuery({
		queryKey: ['channels-tags'], 
		queryFn: () => channels.getAllTags(), 
		select: data => data.data,
	})
}