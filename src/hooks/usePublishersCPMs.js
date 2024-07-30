import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublishersCPMs = (params) => {
	return useQuery({
		queryKey: ['publishers-cpms', params], 
		queryFn: () => publisher.getPublishersCPMs(params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}