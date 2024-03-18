import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const useChannelById = (id) => {
	return useQuery({
		queryKey: ['channel', id],
		queryFn: () => publisher.getChannelByID(id),
		enabled: !!id,
		select: data => data.data
	})
}