import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>404 Page Not Found</div>
      <Link to="/">Go to home</Link>
    </>
  );
};

export default NotFound;
