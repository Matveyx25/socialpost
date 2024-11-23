import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useMyClientContracts = (id) => {
	return useQuery({
		queryKey: ['client-contracts', id],
		queryFn: () => advertiser.getClientContractsId(id),
		enabled: !!id,
		select: data => ({ data: data.data, headers: data.headers })
	})

}