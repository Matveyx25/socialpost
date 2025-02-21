import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useEditClient = (id) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.editClient(data, id),
		onSuccess: () => {
      queryClient.invalidateQueries(['client', id])
    }, 
	})
}