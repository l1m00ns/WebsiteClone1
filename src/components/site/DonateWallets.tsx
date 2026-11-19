"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const WALLETS = [
  { code: "USDC", network: "ERC-20", address: "0x7532Ee57e0d3bc37494F554737EdD6f2A7eAd476" },
  { code: "ETH", network: "Ethereum", address: "0x7532Ee57e0d3bc37494F554737EdD6f2A7eAd476" },
  { code: "BTC", network: "Bitcoin", address: "bc1qhtk5gvrm2c3gvp3yrumhvu57e9zr7f3vt2amgd" },
  { code: "USDT", network: "ERC-20", address: "0x7532Ee57e0d3bc37494F554737EdD6f2A7eAd476" },
  { code: "SOL", network: "Solana", address: "Ca9BhxwpRYgBBx4NaXwKKyDPYjpJea5mzDyiH14x8iG1" },
  { code: "LTC", network: "Litecoin", address: "LaeATnucQTzksXnSqxfAAsSANr56pY9dAr" },
];

export function DonateWallets() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      window.setTimeout(() => setCopied((value) => (value === address ? null : value)), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Supported Cryptocurrencies (Manual)
        </h2>
        <span className="text-xs text-muted-foreground">{WALLETS.length} Options</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {WALLETS.map((wallet) => {
          const isCopied = copied === wallet.address;
          return (
            <div
              key={`${wallet.code}-${wallet.network}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs font-bold text-foreground">
                  {wallet.code}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{wallet.code}</span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {wallet.network}
                    </span>
                  </div>
                  <code className="mt-1 block select-all truncate font-mono text-xs text-muted-foreground">
                    {wallet.address}
                  </code>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copy(wallet.address)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          );
        })}
      </div>
      <p className="pt-2 text-xs leading-relaxed text-muted-foreground">
        <strong className="font-medium text-foreground">Important:</strong> USDC and USDT
        transactions must be sent via the Ethereum (ERC-20) network. Please verify your network
        configurations before transferring funds, as assets sent to incorrect networks cannot be
        recovered.
      </p>
    </div>
  );
}
