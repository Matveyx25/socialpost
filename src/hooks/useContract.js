import { useQuery } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useContract = (id) => {
	return useQuery({
		queryKey: ['contract', id],
		queryFn: () => advertiser.getContract(id),
		enabled: !!id,
		select: data => data.data
	})

}