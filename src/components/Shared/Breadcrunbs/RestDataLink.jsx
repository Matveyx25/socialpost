import { useEffect } from "react";
import { Link } from "react-router-dom";

export function RestDataLink(props) {
  const { getLinkText, useRestLazyQuery, to, payload } = props;
  const [getData, { data }] = useRestLazyQuery(payload);

  useEffect(() => {
    getData(payload);
  }, [payload]); 

  return <Link to={to}>{getLinkText(data)}</Link>;
}