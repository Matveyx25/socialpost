import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublishersRequestById = (id) => {
	return useQuery({
		queryKey: ['publishers-request', id], 
		enabled: !!id,
		queryFn: () => publisher.getPublishersRequestById(id), 
		select: data => data.data
	})
}