import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  PaymentLockClaimed,
  PaymentLockCreated,
  PaymentLockExpired,
  PaymentLockExpirationExtended,
  PaymentLockReleased,
  PaymentLockResupplied,
} from "../generated/AmperaVault/AmperaVault";
import { loadAccount, loadPaymentLock } from "./utils";

export function handlePaymentLockCreated(event: PaymentLockCreated): void {
  let locker = loadAccount(event.params.locker.toHex());
  log.warning("locker nonce {}", [locker.nonce.toString()]);
  locker.nonce = locker.nonce.plus(BigInt.fromI64(1));
  locker.save();
  let claimant = loadAccount(event.params.claimant.toHex());
  claimant.save();
  const lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );

  lock.account = locker.id;
  lock.claimant = claimant.id;
  lock.amount = event.params.amount;
  lock.claimed = false;
  lock.collateralId = event.params.collateralId;
  lock.expiration = event.params.expiration;
  lock.nonce = event.params.nonce;
  lock.securedAmount = event.params.securedAmount;
  lock.securedAssetId = event.params.securedAssetId;
  lock.claimReason = "";
  lock.save();
}

export function handlePaymentLockClaimed(event: PaymentLockClaimed): void {
  const lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );
  lock.claimed = true;
  lock.claimReason = "claimed";
  lock.save();
}

export function handlePaymentLockExpirationExtended(
  event: PaymentLockExpirationExtended
): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );
  lock.expiration = lock.expiration.plus(event.params.extension);
  lock.save();
}

export function handlePaymentLockExpired(event: PaymentLockExpired): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );
  lock.claimed = true;
  lock.claimReason = "expired";
  lock.save();
}

export function handlePaymentLockReleased(event: PaymentLockReleased): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );
  lock.claimed = true;
  lock.claimReason = "released";
  lock.save();
}

export function handlePaymentLockResupplied(
  event: PaymentLockResupplied
): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex()
  );
  lock.amount = lock.amount.plus(event.params.amount);
  lock.save();
}
