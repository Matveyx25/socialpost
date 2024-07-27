import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useStartCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.startCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
    }, 
	})
}