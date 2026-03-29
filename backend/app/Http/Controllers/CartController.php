<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use App\Support\MorphTypeResolver;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::where('user_id', auth()->id())->get();

        foreach ($carts as $cart) {
            $type = MorphTypeResolver::toClass($cart->cartable_type);
            if ($type) {
                $cart->cartable_type = $type;
            }
        }

        $carts->load('cartable');
        return $this->success($carts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cartable_id' => 'required|integer',
            'cartable_type' => 'required|string',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $cartableType = MorphTypeResolver::toClass($request->cartable_type);
        if (!$cartableType) {
            return $this->error('Invalid cartable type', 422);
        }

        if (!$cartableType::whereKey($request->cartable_id)->exists()) {
            return $this->error('Invalid cartable id', 422);
        }

        $cart = Cart::create([
            'user_id' => auth()->id(),
            'cartable_id' => $request->cartable_id,
            'cartable_type' => $cartableType,
            'quantity' => $request->quantity ?? 1,
        ]);
        return $this->success($cart, '', 201);
    }

    public function update(Request $request, $id)
    {
        $cart = Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $cart->update($request->only('quantity'));
        return $this->success($cart);
    }

    public function destroy($id)
    {
        Cart::where('id', $id)->where('user_id', auth()->id())->firstOrFail()->delete();
        return $this->success(null, 'Deleted successfully');
    }
}
