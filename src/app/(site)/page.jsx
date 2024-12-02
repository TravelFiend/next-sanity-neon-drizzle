// import Image from 'next/image';

const Home = () => {
  // eslint-disable-next-line no-console
  console.log({
    mom: 'fuck this',
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DEV_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Husky testing, only Sanity deploy to go</div>
    </main>
  );
};

export default Home;
