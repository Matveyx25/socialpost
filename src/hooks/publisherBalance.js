import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { publisher } from "../api/api"

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
    }, 
	})
}

export const useSelfEmployedBankDetails = () => {
	return useQuery({
		queryKey: ['self-employed-bank-details'],
		queryFn: publisher.getSelfEmployedBankDetails,
		select: data => data.data
	})
}

export const useUpdateSelfEmployedBankDetails = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateSelfEmployedBankDetails,
		onSuccess: () => {
      queryClient.invalidateQueries(['self-employed-bank-details'])
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
    }, 
	})
}

export const useLegalEntityBankDetails = () => {
	return useQuery({
		queryKey: ['legal-entity-bank-details'],
		queryFn: publisher.getLegalEntityBankDetails,
		select: data => data.data
	})
}

export const useUpdateLegalEntityBankDetails = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateLegalEntityBankDetails,
		onSuccess: () => {
      queryClient.invalidateQueries(['legal-entity-bank-details'])
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
    }, 
	})
}

export const useIEBankDetails = () => {
	return useQuery({
		queryKey: ['ie-bank-details'],
		queryFn: publisher.getIEBankDetails,
		select: data => data.data
	})
}

export const useUpdateIEBankDetails = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: publisher.updateIEBankDetails,
		onSuccess: () => {
      queryClient.invalidateQueries(['ie-bank-details'])
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
    }, 
	})
}