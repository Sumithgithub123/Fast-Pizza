import { useSelector } from "react-redux";

function Username() {
  const name = useSelector((state) => state.user.name);

  if (!name) return null;

  return <div className="hidden text-sm font-semibold md:block">{name}</div>;
}

export default Username;
