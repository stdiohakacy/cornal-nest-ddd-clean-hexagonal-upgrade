import { UniqueEntityId } from '../identifer/unique-entity.id';

export const isEntity = <T>(object: unknown): object is BaseEntity<T> => {
  return object instanceof BaseEntity;
};

export abstract class BaseEntity<T> {
  protected readonly _id: UniqueEntityId;
  public props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;
  }

  public equals(object: BaseEntity<T>): boolean {
    if (!object) return false;
    if (!isEntity(object)) {
      return false;
    }
    if (this === object) return true;
    return this._id.equals(object._id);
  }
}
