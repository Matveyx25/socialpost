import { useQuery } from "@tanstack/react-query"
import { channels } from "../api/api"

export const useChannels = (params) => {
	return useQuery({
		queryKey: ['channels', params], 
		queryFn: () => channels.getAllChannels(params), 
		select: data => data.data
	})
}