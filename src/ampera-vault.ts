import { BigInt } from "@graphprotocol/graph-ts";
import { AuthorizeSpendCall } from "../generated/AmperaVault/AmperaVault";
import { loadAccount, loadPaymentLock } from "./utils";

const LOCK_TIME = BigInt.fromI64(100000);

export function handleAuthorizeSpend(call: AuthorizeSpendCall): void {
  let account = loadAccount(call.from);
  let paymentLock = loadPaymentLock(
    `${call.from.toHex()}-${call.inputs.recipient.toHex()}`
  );

  paymentLock.account = account.id;
  paymentLock.recipient = call.inputs.recipient;
  paymentLock.amount = call.inputs.amount;
  paymentLock.expiration = LOCK_TIME;
  paymentLock.collateralId = call.inputs.collateralId;
  paymentLock.active = true;
  paymentLock.nonce = account.nonce;

  paymentLock.save();

  account.nonce = account.nonce.plus(BigInt.fromI64(1));

  account.save();
}
