import { useQuery } from "@tanstack/react-query"
import { publisher } from "../api/api"

export const usePublishersCPMById = (id) => {
	return useQuery({
		queryKey: ['publishers-cpm', id], 
		enabled: !!id,
		queryFn: () => publisher.getPublishersCPMById(id), 
		select: data => data.data
	})
}