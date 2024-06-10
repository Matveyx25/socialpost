import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"
import { useProfile } from './useProfile';

export const useMyChannels = () => {
	const {data: profile} = useProfile()

	return useQuery({
		queryKey: ['my-channels'], 
		queryFn: publisher.getChannels, 
		enabled: profile.roles.includes('PUBLISHER'),
		select: data => data.data
	})
}