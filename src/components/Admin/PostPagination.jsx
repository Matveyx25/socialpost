import { Pagination } from "react-admin";

export const PostPagination = (props) => <Pagination perPage={25} rowsPerPageOptions={[25, 50, 75, 100]} {...props}/>;