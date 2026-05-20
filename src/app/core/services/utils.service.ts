import {HttpHeaders, HttpParams} from "@angular/common/http";
import ConstUrls from "../../shared/contants/const-urls";
import ConstLocalStorage from "../../shared/contants/const-local-storage";
import {Usuario} from "../models/user.model";

export default async function to(promise: Promise<any>) {
    try {
        const data = await promise
        return data
    } catch (err) {
        return [err]
    }
}

export function isOkResponse(response: any): boolean {
    if (response && response.body && response.body.type === "OK") {
        return true;
    }
    return false;
}

export function loadResponseData(response: any): any {
    return response.body.data;
}

export function loadResponseError(response: any): string {
    if (!response || !response.body || !response.body.exception) {
        return "Error inesperado de servidor";
    } else {
        return response.body.exception.codigoDeError + ' ' + response.body.exception.mensajeDeError;
    }
}

export const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

export function loadCredentials(): HttpParams {
    const usuario = obtenerUsuarioLogado();
    let params = new HttpParams();
    if (usuario && usuario.nickUsuario && usuario.contrasena) {
        params = params
            .set(ConstUrls.NICK_USUARIO_PARAM, usuario.nickUsuario)
            .set(ConstUrls.PASS_USUARIO_PARAM, usuario.contrasena);
    }
    return params;
}

export function guardarUsuarioLogado(usuario: Usuario) {
    localStorage.setItem(ConstLocalStorage.USUARIO_LOGADO_STORAGE, JSON.stringify(usuario));
}

export function obtenerUsuarioLogado(): Usuario | null {
    const data = localStorage.getItem(ConstLocalStorage.USUARIO_LOGADO_STORAGE);
    return data ? JSON.parse(data) : null;
}

