import { BigInt } from '@graphprotocol/graph-ts'
import {
  PaymentLockClaimed,
  PaymentLockCreated,
  PaymentLockExpired,
  PaymentLockExpirationExtended,
  PaymentLockReleased,
  PaymentLockResupplied,
} from '../generated/AmperaVault/AmperaVault'
import { loadAccount, loadPaymentLock } from './utils'

export function handlePaymentLockCreated(event: PaymentLockCreated): void {
  const lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  let locker = loadAccount(event.params.locker)
  let claimant = loadAccount(event.params.claimant)

  locker.nonce = locker.nonce.plus(BigInt.fromI64(1))

  lock.account = event.params.locker
  lock.claimant = event.params.claimant
  lock.amount = event.params.amount
  lock.claimed = false
  lock.collateralId = event.params.collateralId
  lock.expiration = event.params.expiration
  lock.nonce = event.params.nonce
  lock.securedAmount = event.params.securedAmount
  lock.securedAssetId = event.params.securedAssetId

  lock.save()
  locker.save()
}

export function handlePaymentLockClaimed(event: PaymentLockClaimed): void {
  const lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  lock.claimed = true
  lock.save()
}

export function handlePaymentLockExpirationExtended(
  event: PaymentLockExpirationExtended,
): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  lock.expiration = lock.expiration.plus(event.params.extension)
  lock.save()
}

export function handlePaymentLockExpired(event: PaymentLockExpired): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  lock.claimed = true
  lock.save()
}

export function handlePaymentLockReleased(event: PaymentLockReleased): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  lock.claimed = true
  lock.save()
}

export function handlePaymentLockResupplied(
  event: PaymentLockResupplied,
): void {
  let lock = loadPaymentLock(
    event.params.locker.toHex() + event.params.claimant.toHex(),
  )
  lock.amount = lock.amount.plus(event.params.amount)
  lock.save()
}
