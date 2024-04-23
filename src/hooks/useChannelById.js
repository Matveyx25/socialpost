import { useQuery } from "@tanstack/react-query"
import { channels } from "../api/api"

export const useChannelById = (id) => {
	return useQuery({
		queryKey: ['channel', id],
		queryFn: () => channels.getChannelById(id),
		enabled: !!id,
		select: data => data.data
	})
}