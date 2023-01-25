// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class PaymentLock extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PaymentLock entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PaymentLock must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PaymentLock", id.toString(), this);
    }
  }

  static load(id: string): PaymentLock | null {
    return changetype<PaymentLock | null>(store.get("PaymentLock", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get claimant(): string {
    let value = this.get("claimant");
    return value!.toString();
  }

  set claimant(value: string) {
    this.set("claimant", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get expiration(): BigInt {
    let value = this.get("expiration");
    return value!.toBigInt();
  }

  set expiration(value: BigInt) {
    this.set("expiration", Value.fromBigInt(value));
  }

  get collateralId(): BigInt {
    let value = this.get("collateralId");
    return value!.toBigInt();
  }

  set collateralId(value: BigInt) {
    this.set("collateralId", Value.fromBigInt(value));
  }

  get securedAssetId(): BigInt {
    let value = this.get("securedAssetId");
    return value!.toBigInt();
  }

  set securedAssetId(value: BigInt) {
    this.set("securedAssetId", Value.fromBigInt(value));
  }

  get securedAmount(): BigInt {
    let value = this.get("securedAmount");
    return value!.toBigInt();
  }

  set securedAmount(value: BigInt) {
    this.set("securedAmount", Value.fromBigInt(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get claimed(): boolean {
    let value = this.get("claimed");
    return value!.toBoolean();
  }

  set claimed(value: boolean) {
    this.set("claimed", Value.fromBoolean(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get paymentLocks(): Array<string> | null {
    let value = this.get("paymentLocks");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set paymentLocks(value: Array<string> | null) {
    if (!value) {
      this.unset("paymentLocks");
    } else {
      this.set("paymentLocks", Value.fromStringArray(<Array<string>>value));
    }
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value!.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }
}
