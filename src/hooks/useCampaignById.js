import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useCampaignById = (id) => {
	return useQuery({
		queryKey: ['campaign', id],
		queryFn: () => advertiser.getCampaignById(id),
		enabled: !!id,
		select: data => data.data
	})
}