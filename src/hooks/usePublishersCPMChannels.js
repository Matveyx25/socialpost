import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublishersCPMChannels = (id, params) => {
	return useQuery({
		queryKey: ['publishers-cpm-channels', params, id], 
		queryFn: () => publisher.getPublishersCPMChannels(id, params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}