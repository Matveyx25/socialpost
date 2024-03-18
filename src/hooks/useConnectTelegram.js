import { useMutation, useQueryClient } from "@tanstack/react-query"
import { profile } from "../api/api"

export const useConnectTelegram = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: profile.connectTelegram,
		onSuccess: () => {
      queryClient.invalidateQueries(['profile'])
    },
	})
}