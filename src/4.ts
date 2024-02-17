interface MyHouseInterface {
  door: boolean;
  key: Key;
  comeIn(person: Person): void;
  openDoor(key: Key): void;
  getTenantsList(): string[];
}

enum Role {
  Owner = "Owner",
  Visitor = "Visitor",
}

class Key {
  public signature;
  constructor() {
    this.signature = Math.random();
  }
  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key, public status: string) {
    this.key = key;
  }
  public getKey() {
    return this.key;
  }
}

abstract class House implements MyHouseInterface {
  public door: boolean;
  private tenants: Person[] = [];

  constructor(public key: Key) {}

  public comeIn(person: Person): void {
    this.door && this.tenants.push(person);
  }

  abstract openDoor(key: Key): void;

  public getTenantsList(): string[] {
    return this.tenants.map(({ status }) => status);
  }
}

class MyHouse extends House {
  door: boolean;
  constructor(key: Key) {
    super(key);
  }
  public openDoor(key: Key) {
    this.door = this.key === key;
  }
}

const key = new Key();
const fakeKey = new Key();
const house = new MyHouse(key);
const person = new Person(key, Role.Owner);
const visitor = new Person(fakeKey, Role.Visitor);

house.openDoor(person.getKey());
house.comeIn(person);
house.getTenantsList();

house.openDoor(visitor.getKey());
house.comeIn(visitor);
house.getTenantsList();

export {};
