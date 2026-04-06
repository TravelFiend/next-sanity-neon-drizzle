import { getUserAddresses } from '@/db/_getters/addressGetters';
import AddAddressButton from '@/components/addresses/AddAddressButton';

// type AddressesPageProps = {};

export default async function AddressesPage() {
  const addresses = await getUserAddresses();

  return (
    <>
      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map(address => (
            <div
              key={address.id}
              className="w-full rounded-md border border-gray-200 p-4"
            >
              <p className="font-semibold">
                Name: {address.recipientFirstName} {address.recipientLastName}
              </p>
              <p>Address type: {address.addressLabel}</p>
              <p>Address: {address.streetAddress}</p>
              <p>{address.secondaryAddress}</p>
              <p>
                {address.city}, {address.state} {address.ZIPCode}
              </p>
              <p>Phone: {address.phoneNumber}</p>
              {address.isDefault && (
                <p className="text-accent-light italic">default address</p>
              )}
            </div>
          ))}
          <AddAddressButton buttonText="+ Add address" />
        </div>
      ) : (
        <p>
          No Addresses currently saved.{' '}
          <span>
            <AddAddressButton buttonText="Add a new address." />
          </span>
        </p>
      )}
    </>
  );
}
