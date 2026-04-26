// Simple button component for beginners
const AnotherButton = ({ children, ...props }) => {
  return (
    <button
      className="btn btn-primary mt-3"
      {...props}
    >
      {children}
    </button>
  );
};

export { AnotherButton };
