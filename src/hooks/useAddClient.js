import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useAddClient = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: advertiser.createClient,
		onSuccess: () => {
      queryClient.invalidateQueries(['my-clients'])
    }, 
	})
}