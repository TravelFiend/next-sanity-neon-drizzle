import AddAddressButton from '@/components/addresses/AddAddressButton';

// type AddressesPageProps = {};

export default function AddressesPage() {
  const addresses = null;
  return (
    <>
      {addresses ? (
        <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
      ) : (
        <p>
          No Addresses currently saved.{' '}
          <span>
            <AddAddressButton />
          </span>
        </p>
      )}
    </>
  );
}
