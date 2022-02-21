import { User } from "../store/user/user.reducer";

export enum Gender {
    Male = 'M',
    Female = 'F'
}

export enum Status {
    Activo = 'activo',
    Inactivo = 'inactivo',
}

export interface ISocio extends User{

}