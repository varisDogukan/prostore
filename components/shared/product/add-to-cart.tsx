"use client";

import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();

  const [isIncreasePending, startIncreaseTransition] = useTransition();
  const [isDecreasePending, startDecreaseTransition] = useTransition();

  const handleAddToCart = async () => {
    startIncreaseTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Handle success add to cart
      toast.success(res.message, {
        action: (
          <Button
            className='bg-primary text-secondary hover:bg-gray-800 hover:text-primary'
            onClick={() => router.push("/cart")}
          >
            Go to Cart
          </Button>
        ),
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startDecreaseTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast.error(res.message);

      return;
    });
  };

  // Check if items in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className='w-full grid grid-cols-[1fr_auto_1fr] items-center gap-1'>
      <Button
        type='button'
        variant='outline'
        onClick={handleRemoveFromCart}
        disabled={isDecreasePending}
      >
        {isDecreasePending ? (
          <Loader className='size-4 animate-spin' />
        ) : (
          <Minus className='size-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button
        type='button'
        variant='outline'
        onClick={handleAddToCart}
        disabled={isIncreasePending}
      >
        {isIncreasePending ? (
          <Loader className='size-4 animate-spin' />
        ) : (
          <Plus className='size-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className='w-full'
      type='button'
      onClick={handleAddToCart}
      disabled={isIncreasePending}
    >
      {isIncreasePending ? (
        <Loader className='size-4 animate-spin' />
      ) : (
        <>
          <Plus /> Add To Cart
        </>
      )}
    </Button>
  );
};

export default AddToCart;
