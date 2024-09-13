import Container from "./Container";
import ProductCart from "./ProductCart";

const ProductList = ({ products }) => {
      return (
            <div className="py-10">
                  <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                              products.map((item) => <ProductCart product={item} key={item?.id} />)
                        }
                  </Container>
            </div>
      );
};

export default ProductList;