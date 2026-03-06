import { AddressActionState } from '@/_actions/address/addressActions';
import ModalWrapper from '../common/ModalWrapper';
import VerifiedAddressSelector from './VerifiedAddressSelector';
import type { VerifiedAddress } from '@/types/address';

type VerifiedAddressSelectorModalProps = {
  onClose: () => void;
  addressData: Extract<AddressActionState, { fromAPI: true }> & {
    data: VerifiedAddress;
  };
};

const VerifiedAddressSelectorModal = ({
  onClose,
  addressData
}: VerifiedAddressSelectorModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <VerifiedAddressSelector addressData={addressData} onClose={onClose} />
    </ModalWrapper>
  );
};

export default VerifiedAddressSelectorModal;
