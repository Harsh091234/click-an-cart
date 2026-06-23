const FormError = ({ error, errorRef, className = "" }) => {
  return (
    <p
      ref={errorRef}
      className={`hidden mt-2 overflow-hidden text-sm text-red-500 ${className}`}
    >
      {error?.message}
    </p>
  );
};

export default FormError;
