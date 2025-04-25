import { useLocation, useParams, useSearchParams } from "react-router-dom";

function UserDetail(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const location = useLocation();
  console.log(params, location, searchParams.get("id")); //query
  return <div>UserDetail</div>;
}

export default UserDetail;
