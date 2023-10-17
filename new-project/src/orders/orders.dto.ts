export class Orders {
  readonly date: date;
  readonly user: {'username': 'string', 'email': 'string'};
  readonly items: {'product': {'name': 'string', 'price': 'number', 'quantity': 'number'}};
}
