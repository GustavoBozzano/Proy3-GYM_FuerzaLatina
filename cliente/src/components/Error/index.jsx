function Error({ errorMessage, closeModal }) {
  return (
    <div onClick={closeModal}>
      <p>{errorMessage}</p>
    </div>
  );
}

export default Error;
