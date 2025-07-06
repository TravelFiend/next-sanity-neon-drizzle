type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-12 sm:px-24">
      {children}
    </div>
  );
};

export default ContentWrapper;
