import AddressForm from '@/components/addresses/AddressForm';

type CheckoutPageProps = {
  isOpen: boolean;
};

export default function CheckoutPage({ isOpen = false }: CheckoutPageProps) {
  return <AddressForm isEmbedded={true} />;
}
