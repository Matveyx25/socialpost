import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useMyCampaign = (params) => {
	return useQuery({
		queryKey: ['my-campaign', params], 
		queryFn: () => advertiser.getMyCampaigns(params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}