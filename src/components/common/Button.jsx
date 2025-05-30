const Button = ({ label, onClick }) => {
  return (
    <button type="button" className="rounded-lg" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
