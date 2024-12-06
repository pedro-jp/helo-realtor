const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100dvh',
        overflowY: 'auto',
        paddingBottom: '1rem'
      }}
    >
      {children}
    </div>
  );
};

export default Content;
