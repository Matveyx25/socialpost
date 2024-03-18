import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useMyChannels = () => {
	return useQuery({
		queryKey: ['my-channels'], 
		queryFn: publisher.getChannels, 
		select: data => data.data
	})
}