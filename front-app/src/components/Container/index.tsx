const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        minHeight: '100dvh',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
