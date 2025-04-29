import { Link, Outlet } from "./mini-react-router";
import { CustomLink } from "./index";
function Product(props) {
  return (
    <>
      <div>Product</div>
      <CustomLink to="/product/123">商品详情</CustomLink>
      <Outlet />
    </>
  );
}

export default Product;
