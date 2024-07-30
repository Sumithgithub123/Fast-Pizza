/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function LinkButton({ onClick, children, to }) {
  return (
    <Link
      onClick={onClick}
      to={to}
      className="text-sm text-blue-500 hover:text-blue-900 hover:underline"
    >
      {children}
    </Link>
  );
}

export default LinkButton;
