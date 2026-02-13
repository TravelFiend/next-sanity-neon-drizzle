import ModalWrapper from '../common/ModalWrapper';
import VerifiedAddressSelector from './VerifiedAddressSelector';
import type { VerifiedAddress } from '@/types/address';

type VerifiedAddressSelectorModalProps = {
  onClose: () => void;
  addressData: {
    success: true;
    fromAPI: true;
    data: VerifiedAddress;
  };
};

const VerifiedAddressSelectorModal = ({
  onClose,
  addressData
}: VerifiedAddressSelectorModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <VerifiedAddressSelector addressData={addressData} />
    </ModalWrapper>
  );
};

export default VerifiedAddressSelectorModal;
