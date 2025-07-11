import { useQuery } from "@tanstack/react-query"
import { channels } from "../api/api"

export const useChannels = (params, defaultId) => {
	return useQuery({
		queryKey: ['channels', params, defaultId], 
		queryFn: () => channels.getAllChannels(params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}