import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useCMPChannels = (id, params) => {
	return useQuery({
		queryKey: ['cpm-channels', id, params], 
		queryFn: () => advertiser.getCPMChannels(id, params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}