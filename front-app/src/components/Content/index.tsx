const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default Content;
