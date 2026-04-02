"use client";

import { useState } from "react";
import { CheckCircle, MapPin, Phone, ShoppingBag, Package } from "lucide-react";
import { Conversation } from "@/types/inbox";
import { Button } from "@/components/ui/button";

type OrderPanelProps = {
  conversation: Conversation;
  onPlaceOrder: () => void;
};

export function OrderPanel({ conversation, onPlaceOrder }: OrderPanelProps) {
  const [orderJustPlaced, setOrderJustPlaced] = useState(false);

  const { liveProduct, queryResult, orderDraft, customer } = conversation;

  const isPlaced = orderDraft?.placed || orderJustPlaced;

  function handlePlaceOrder() {
    setOrderJustPlaced(true);
    onPlaceOrder();
  }

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col gap-0 overflow-y-auto border-l border-slate-200 bg-white">
      {/* Customer info */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">
          {customer
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{customer}</p>
          <p className="text-xs text-slate-400">Customer</p>
        </div>
      </div>

      {/* Live Product */}
      {liveProduct && (
        <div className="border-b border-slate-200 px-4 py-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Live Product
          </p>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ShoppingBag className="size-6" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                {liveProduct.title}
              </p>
              <p className="text-xs text-slate-500">{liveProduct.price}</p>
              <p className="text-[11px] text-slate-400">
                SKU: {liveProduct.sku}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {liveProduct.variants.map((v) => (
                  <span
                    key={v}
                    className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Query & Result */}
      {queryResult && (
        <div className="border-b border-slate-200 px-4 py-4">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
              <div className="border-r border-slate-200 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Queries
              </div>
              <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Result
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-slate-200 px-3 py-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {queryResult.currentQuery}
                </p>
              </div>
              <div className="space-y-1.5 px-3 py-3">
                {queryResult.product && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">
                      Got product –
                    </span>
                    <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">
                      {queryResult.product}
                    </span>
                  </div>
                )}
                {queryResult.variant && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">
                      Got variant –
                    </span>
                    <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
                      {queryResult.variant}
                    </span>
                  </div>
                )}
                {queryResult.deliveryDate && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">
                      Delivery Date –
                    </span>
                    <span className="text-[10px] font-semibold text-slate-700">
                      {queryResult.deliveryDate}
                    </span>
                  </div>
                )}
                {!queryResult.product &&
                  !queryResult.variant &&
                  !queryResult.deliveryDate && (
                    <p className="text-[11px] italic text-slate-400">
                      Extracting info…
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Status */}
      {orderDraft && (
        <div className="px-4 py-4">
          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 px-4 py-2.5">
              <p className="text-sm font-semibold text-slate-800">
                Order Status
              </p>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              {/* Order summary lines — match wireframe style */}
              <div className="space-y-1.5 text-[13px]">
                <p className="text-orange-500 font-medium">
                  Selected number of product: {orderDraft.quantity}
                </p>
                <p className="text-orange-500 font-medium">
                  {orderDraft.variant} {orderDraft.productName}
                </p>
                <p className="text-orange-500 font-medium">
                  Deliver on {orderDraft.deliveryDate}
                </p>
                <div className="flex items-start gap-1.5 text-orange-500 font-medium">
                  <MapPin className="size-3.5 shrink-0 mt-0.5" />
                  <span>Address: {orderDraft.address}</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-500 font-medium">
                  <Phone className="size-3.5 shrink-0" />
                  <span>Phone: {orderDraft.phone}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              {!isPlaced && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] text-slate-500 leading-snug">
                      All requirements for order completion
                    </p>
                    <Button
                      size="sm"
                      onClick={handlePlaceOrder}
                      className="shrink-0 text-xs"
                    >
                      place order
                    </Button>
                  </div>
                </div>
              )}

              {/* Confirmation message */}
              {isPlaced && (
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2 rounded-lg bg-green-50 p-3">
                    <CheckCircle className="size-4 shrink-0 text-green-600 mt-0.5" />
                    <p className="text-[11px] text-green-700 leading-relaxed">
                      Order successfully placed with {orderDraft.quantity}{" "}
                      {orderDraft.variant.toLowerCase()}{" "}
                      {orderDraft.productName.toLowerCase()}
                      {orderDraft.variant.includes("Size")
                        ? ""
                        : `, ${orderDraft.variant.toLowerCase()} size`}
                      , address: {orderDraft.address.toLowerCase()}, phone:{" "}
                      {orderDraft.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state when no order context yet */}
      {!orderDraft && !queryResult && (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-8 text-center">
          <Package className="size-10 text-slate-300" />
          <p className="text-sm text-slate-400">No order context yet</p>
          <p className="text-xs text-slate-400">
            Continue the conversation to extract product and delivery details.
          </p>
        </div>
      )}

      {!orderDraft && queryResult && (
        <div className="px-4 py-3 text-center">
          <p className="text-xs text-slate-400">
            Waiting for address &amp; phone to complete the order.
          </p>
        </div>
      )}
    </aside>
  );
}
