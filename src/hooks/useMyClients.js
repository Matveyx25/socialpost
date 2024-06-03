import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useMyClients = (params) => {
	return useQuery({
		queryKey: ['my-clients', params], 
		queryFn: () => advertiser.getMyClients(params), 
		select: data => ({ data: data.data, headers: data.headers }),
	})
}