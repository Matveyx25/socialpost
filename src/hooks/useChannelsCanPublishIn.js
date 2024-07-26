import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useChannelsCanPublishIn = (params) => {
	return useQuery({
		queryKey: ['can_publish_in_channels'],
		queryFn: () => advertiser.getCanPublishChannels(params),
		enabled: !!params,
		select: data => data.data
	})
}