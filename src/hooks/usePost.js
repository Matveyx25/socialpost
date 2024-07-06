import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const usePost = (id) => {
	return useQuery({
		queryKey: ['post', id], 
		enabled: !!id,
		queryFn: () => advertiser.getPostById(id), 
		select: data => data.data
	})
}