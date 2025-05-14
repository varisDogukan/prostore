"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import { Cart } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const [isIncreasePending, startIncreaseTransition] = useTransition();
  const [isDecreasePending, startDecreaseTransition] = useTransition();

  return (
    <>
      <h1 className='p7 h2-bold'>Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className='text-center'>Quatity</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className='px-2 select-none'>{item.name}</span>
                      </Link>
                    </TableCell>

                    <TableCell className='flex-center gap-2'>
                      <Button
                        disabled={isDecreasePending}
                        variant='outline'
                        type='button'
                        onClick={() =>
                          startDecreaseTransition(async () => {
                            const res = await removeItemFromCart(
                              item.productId
                            );

                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isDecreasePending ? (
                          <Loader className='size-4 animate-spin' />
                        ) : (
                          <Minus className='size-4' />
                        )}
                      </Button>
                      <span className='select-none'>{item.qty}</span>
                      <Button
                        disabled={isIncreasePending}
                        variant='outline'
                        type='button'
                        onClick={() =>
                          startIncreaseTransition(async () => {
                            const res = await addItemToCart(item);

                            if (!res.success) {
                              toast.error(res.message);
                            }
                          })
                        }
                      >
                        {isIncreasePending ? (
                          <Loader className='size-4 animate-spin' />
                        ) : (
                          <Plus className='size-4' />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className='text-right'>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;

// toast.error(res.message);
// toast.success(res.message, {
//         action: (
//           <Button
//             className='bg-primary text-secondary hover:bg-gray-800 hover:text-primary'
//             onClick={() => router.push("/cart")}
//           >
//             Go to Cart
//           </Button>
//         ),
//       });
