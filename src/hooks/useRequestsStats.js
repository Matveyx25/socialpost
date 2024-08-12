import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useRequestsStats = () => {
	return useQuery({
		queryKey: ['requests-stats'], 
		queryFn: () => advertiser.getRequestsStats(), 
		select: data => data.data
	})
}