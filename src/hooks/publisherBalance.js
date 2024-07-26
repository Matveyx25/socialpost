import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { publisher, profile } from "../api/api"
import { toast } from "react-toastify"

export const useSelfEmployed = () => {
	return useQuery({
		queryKey: ['self-employed'],
		queryFn: publisher.getSelfEmployed,
		select: data => data.data
	})
}

export const useUpdateSelfEmployed = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateSelfEmployed,
		onSuccess: () => {
      queryClient.invalidateQueries(['self-employed'])
			toast.success('Данные обновлены')
    }, 
	})
}

export const useLegalEntity = () => {
	return useQuery({
		queryKey: ['legal-entity'],
		queryFn: publisher.getLegalEntity,
		select: data => data.data
	})
}

export const useUpdateLegalEntity = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateLegalEntity,
		onSuccess: () => {
      queryClient.invalidateQueries(['legal-entity'])
			toast.success('Данные обновлены')
    }, 
	})
}

export const useIE = () => {
	return useQuery({
		queryKey: ['ie'],
		queryFn: publisher.getIE,
		select: data => data.data
	})
}

export const useUpdateIE = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateIE,
		onSuccess: () => {
      queryClient.invalidateQueries(['ie'])
			toast.success('Данные обновлены')
    }, 
	})
}

export const useCryptoWallet = () => {
	return useQuery({
		queryKey: ['crypto-wallet'],
		queryFn: publisher.getCryptoWallet,
		select: data => data.data
	})
}

export const useUpdateCryptoWallet = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateCryptoWallet,
		onSuccess: () => {
      queryClient.invalidateQueries(['crypto-wallet'])
			toast.success('Данные обновлены')
    }, 
	})
}

export const useBalanceOperations = (params) => {
	return useQuery({
		queryKey: ['balance-operations', params],
		queryFn: () => profile.getBalanceOperations(params),
		select: data => ({ data: data.data, headers: data.headers }),
	})
}

export const useWithdrawal = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: profile.withdrawalBalance,
		onSuccess: () => {
      queryClient.invalidateQueries(['balance-operations'])
			toast.success('Заявка создана')
    }, 
	})
}