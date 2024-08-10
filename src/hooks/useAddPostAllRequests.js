import { useMutation, useQueryClient } from "@tanstack/react-query"
import { advertiser } from "../api/api"
import { toast } from "react-toastify"

export const useAddPostAllRequests = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: advertiser.createRequestForAll,
		onSuccess: (data) => {
      queryClient.invalidateQueries(['post', data.id])
			toast.success('Заявка создана')
    }, 
	})
}