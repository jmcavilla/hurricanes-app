import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import userReducer, { UserState } from "./user/user.reducer";
import { authReducer, AuthState } from "./auth/auth.reducer";
import { uiReducer, UIState } from "./ui/ui.reducer";
import { socioReducer, SocioState } from "./socio/socio.reducer";
import { cuotaReducer, CuotaState } from "./cuota/cuota.reducer";
import { adminReducer, AdminState } from "./admin/admin.reducer";
import { eventoReducer, EventoState } from "./evento/evento.reducer";
import { staffReducer, StaffState } from "./staff/staff.reducer";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export type RootState = {
    user: UserState,
    ui: UIState,
    auth: AuthState,
    socio: SocioState,
    cuota: CuotaState,
    admin: AdminState,
    evento: EventoState,
    staff: StaffState
}

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    ui: uiReducer,
    socio: socioReducer,
    cuota: cuotaReducer,
    admin: adminReducer,
    evento: eventoReducer,
    staff: staffReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware( thunk )
))
export default store;