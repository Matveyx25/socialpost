import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useStartAllCPM = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id) => advertiser.startAllCPM(id),
		onSuccess: (data) => {
      queryClient.invalidateQueries(['campaign', data.id])
    }, 
	})
}