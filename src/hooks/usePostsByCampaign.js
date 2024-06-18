import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const usePostsByCampaign = (id, params) => {
	return useQuery({
		queryKey: ['posts', id, params],
		queryFn: () => advertiser.getPostsByCampaign(id, params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}