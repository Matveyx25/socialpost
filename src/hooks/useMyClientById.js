import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useMyClientById = (id) => {
	return useQuery({
		queryKey: ['client', id],
		queryFn: () => advertiser.getClientById(id),
		enabled: !!id,
		select: data => data.data
	})
}