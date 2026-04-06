import { getUserAddresses } from '@/db/_getters/addressGetters';
import AddAddressButton from '@/components/addresses/AddAddressButton';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import SetDefaultButton from '@/components/form/SetDefaultButton';

// type AddressesPageProps = {};

export default async function AddressesPage() {
  const addresses = await getUserAddresses();

  const sortedAddresses = [...(addresses || [])].sort((first, second) => {
    if (first.isDefault === second.isDefault) {
      return second.id - first.id;
    }
    return first.isDefault ? -1 : 1;
  });

  // TODO: add functionality for address update, delete

  return (
    <>
      {sortedAddresses && sortedAddresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedAddresses.map(address => (
            <div
              key={address.id}
              className={conditionalClasses(
                'flex w-full flex-col justify-between rounded-md border p-4',
                address.isDefault ? 'border-secondary' : 'border-gray-200'
              )}
            >
              <div className="mb-2">
                {address.isDefault && (
                  <p className="mb-2 text-accent-light italic">
                    default address
                  </p>
                )}
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
              </div>

              <div className="flex justify-end">
                {!address.isDefault && (
                  <SetDefaultButton addressId={address.id} />
                )}
                <button
                  type="button"
                  className="mr-4 text-accent-light underline"
                >
                  Edit
                </button>
                <button type="button" className="mr-4 text-error underline">
                  Delete
                </button>
              </div>
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
