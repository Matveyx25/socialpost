import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddClientContract = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: advertiser.createClientContract,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-clients'])
    }, 
	})
}