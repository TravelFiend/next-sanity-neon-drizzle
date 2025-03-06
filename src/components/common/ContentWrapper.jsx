const ContentWrapper = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 pt-12 sm:px-24 sm:pt-16">
      {children}
    </main>
  );
};

export default ContentWrapper;
