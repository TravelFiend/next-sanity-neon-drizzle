import AddressForm from '@/components/addresses/AddressForm';

export default function CheckoutPage() {
  return (
    <section className="flex h-full w-full flex-row justify-center">
      <div className="flex h-full items-center justify-center">
        <AddressForm isEmbedded={true} />
      </div>
    </section>
  );
}
