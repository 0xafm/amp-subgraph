import { Address, BigInt } from '@graphprotocol/graph-ts'
import { Account, PaymentLock } from '../../generated/schema'

export function loadPaymentLock(id: string): PaymentLock {
  let entity = PaymentLock.load(id)
  if (entity == null) {
    entity = new PaymentLock(id)
    entity.account = new Address(0)
    entity.claimant = new Address(0)
    entity.amount = BigInt.fromI64(0)
    entity.claimed = false
    entity.collateralId = BigInt.fromI64(0)
    entity.expiration = BigInt.fromI64(0)
    entity.nonce = BigInt.fromI64(0)
    entity.securedAmount = BigInt.fromI64(0)
    entity.securedAssetId = BigInt.fromI64(0)

    entity.save()
  }
  return entity
}

export function loadAccount(id: Address): Account {
  let entity = Account.load(id)
  if (entity == null) {
    entity = new Account(id)
    entity.nonce = BigInt.fromI64(0)
    entity.save()
  }
  return entity
}
