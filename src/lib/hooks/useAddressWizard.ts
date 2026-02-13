'use client';

import { useState, useCallback } from 'react';
import type { AddressForm } from '@/_zodSchemas/frontend/addressForm';
import type { VerifiedAddress } from '@/types/address';

const useAddressWizard = () => {
  const [step, setStep] = useState<'form' | 'select'>('form');
  const [inputtedAddress, setInputtedAddress] =
    useState<Partial<AddressForm> | null>(null);
  const [verifiedAddress, setVerifiedAddress] = useState<
    (VerifiedAddress & { fromAPI: true }) | null
  >(null);

  const selectAddress = useCallback(
    (selected: Partial<AddressForm> | VerifiedAddress) => {
      setInputtedAddress(selected);
      setStep('form');
    },
    []
  );

  const resetState = useCallback(() => {
    setStep('form');
    setInputtedAddress(null);
    setVerifiedAddress(null);
  }, []);

  return {
    step,
    setStep,
    inputtedAddress,
    setInputtedAddress,
    verifiedAddress,
    setVerifiedAddress,
    selectAddress,
    resetState
  };
};

export default useAddressWizard;
