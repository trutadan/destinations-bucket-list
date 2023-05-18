import useAuth from "../../hooks/useAuth";

export const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <div>
      <h1>Welcome to your Destination Bucket List!</h1>
      <p>Enjoy your stay!</p>
    </div>
  );
};
