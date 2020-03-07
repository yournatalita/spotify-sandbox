import { IRequest } from '../store/models/declarations.d';
import { StoreInterface } from '../store/index.d';

export interface MainProps extends StoreInterface {
  getPersonalization: (options: IRequest) => {};
}
