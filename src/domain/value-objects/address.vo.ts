import { BaseValueObject, ValueObjectProps } from './base.vo';

interface AddressProps extends ValueObjectProps {
  street: string;
  city: string;
  country: string;
}

export class Address extends BaseValueObject<AddressProps> {
  constructor(props: AddressProps) {
    super(props);
  }

  public static create(props: AddressProps): Address {
    if (!props.street || !props.city || !props.country) {
      throw new Error('All address fields must be provided.');
    }

    if (props.street.length < 3) {
      throw new Error('Street name must be at least 3 characters long.');
    }

    if (props.city.length < 2) {
      throw new Error('City name must be at least 2 characters long.');
    }

    if (props.country.length < 2) {
      throw new Error('Country name must be at least 2 characters long.');
    }

    return new Address(props);
  }
}
