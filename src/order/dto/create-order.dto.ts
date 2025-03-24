export class CreateOrderDto {
  productIds: { productId: string }[];
  name: string;
  phone: string;
  address: string;
}
