import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const usePostRequests = (id, params) => {
	return useQuery({
		queryKey: ['post-requests', id, params], 
		queryFn: () => advertiser.getRequests(id, params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}