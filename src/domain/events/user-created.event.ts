export class UserCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) { }
  
  public static create(id: string, name: string, email: string) {
    return new UserCreatedEvent(id, name, email);
  }
}
