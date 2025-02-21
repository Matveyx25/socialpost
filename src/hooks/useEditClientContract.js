import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"

export const useEditClientContract = (id) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => advertiser.editContract(data, id),
		onSuccess: () => {
      queryClient.invalidateQueries(['contract', id])
    }, 
	})
}